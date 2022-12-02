import { gameToken, network, teamNFT } from "../../../config/Constants";
import { Box } from "@mui/system";
import nftImage from "../../../assets/images/nft/indiaNFT.png";
import useWeb3Modal from "../../../hooks/useWeb3Modal";
import { ButtonBlue, ButtonGold, ButtonSilver } from "../../Button";
import whiteblock from "../../../assets/images/nft/whiteback.png";
import toast, { Toaster } from "react-hot-toast";
import {
  claimableExact,
  claimRewardExact,
} from "../../../config/NftContractFunctions";
import { BigNumber } from "@ethersproject/bignumber";
import {
  CardTranslucent,
  ImageNft,
  Tournament,
  Country,
  Text,
  CountryFlag,
  Card,
  TotalAmountBox,
  TotalAmount,
  CloseButton,
  ImageSquare,
  InputAmountBox,
  InputLabel,
  InputAmount,
  CurrencyImage,
  ImageLoader,
} from "../NftCard";
import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "@ethersproject/units";
import useNftInfo from "../../../hooks/useNftInfo";
import { ethers } from "ethers";
import axios from "axios";
import { Metadata } from "../../../state/nft/slice";
import { CircularProgress, Skeleton } from "@mui/material";
import MenuWrapper from "../../MenuWrapper";
import { WaitingCard } from "../../TransactionsCards/WaitingCard";
import { useExplorerLink, useTeamLogos } from "../../../state/questions/hooks";
import { ConfirmationCardClaim } from "../TransactionsCards/ConfirmationCardNft";
import { useUpdateInfo } from "../../../state/nft/hooks";
import placeholder from "../../../assets/images/nft/placeholder.svg";
const regex = /^\d*$/;

interface MyNftCardProps {
  id: number;
  winner: BigNumber | undefined;
  runnerUp: BigNumber | undefined;
  balance: BigNumber | undefined;
  minted: BigNumber | undefined;
  claimable: boolean;
  image: string | undefined;
  metadata: Metadata | undefined;
  setBeEligibleModal: (arg: boolean) => void;
}
const MyNftCard: React.FC<MyNftCardProps> = ({
  id,
  winner,
  runnerUp,
  claimable,
  balance,
  minted,
  image,
  metadata,
  setBeEligibleModal,
}) => {
  const { currentAccountAddress } = useWeb3Modal();
  const { basePrice, rewardPoolLocked, uri } = useNftInfo();
  const [isFlipped, setIsFlipped] = useState(false);
  const [amount, setAmount] = useState("0");
  const [reward, setReward] = useState("0");
  const [totalReward, setTotalReward] = useState("0");
  const [error, setError] = useState<string | undefined>(undefined);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [waitingCardMessage, setWaitingCardMessage] = useState("");
  const [, setExplorerLink] = useExplorerLink();
  const [showConfirmationCardClaim, setShowConfirmationCardClaim] =
    useState(false);
  const [explorerLink] = useExplorerLink();
  const [updateInfo, setUpdateInfo] = useUpdateInfo();
  const [teamLogos] = useTeamLogos();

  const getTotalRewardAmount = async () => {
    if (balance) {
      const res = await claimableExact(id, balance, balance);
      if (res) setTotalReward(formatUnits(res, gameToken.decimals));
    }
  };
  useEffect(() => {
    getTotalRewardAmount();
  }, [balance]);
  const getRewardAmount = async () => {
    if (amount === "") {
      setReward("0");
      return;
    }
    if (window?.web3Provider && amount !== "") {
      const res = await claimableExact(id, amount, balance);
      if (res) setReward(formatUnits(res, gameToken.decimals));
    }
  };
  useEffect(() => {
    getRewardAmount();
  }, [amount]);

  const getReward = async () => {
    const tx = await claimRewardExact({
      id,
      amount: amount,
      signer: window.web3Provider.getSigner(),
    });
    setShowWaitingModal(true);
    if (!tx) {
      setShowWaitingModal(false);
      toast.error("Claiming Failed");
    } else {
      let result = await window.web3Provider.waitForTransaction(tx.hash);
      if (result.status == 1) {
        setShowWaitingModal(false);
        setShowConfirmationCardClaim(true);
        //use network for mainnet
        setExplorerLink(network.explorer + tx.hash);
        //alert("Success");
        setShowWaitingModal(false);
        setBeEligibleModal(true);
        setUpdateInfo(!updateInfo);
      } else {
        //alert("Fail");
        toast.error("Claiming Failed");
      }
    }
  };
  useEffect(() => {
    if (amount === "" || amount === "." || amount === "0")
      setError("Enter Amount");
    else if (balance && balance.lt(amount === "" ? "0" : amount))
      setError("Insufficient Balance");
    else setError(undefined);
  }, [amount, balance]);

  return (
    <Card isFlipped={isFlipped}>
      <MenuWrapper
        open={showWaitingModal}
        onClose={() => setShowWaitingModal(false)}
      >
        <WaitingCard
          message={waitingCardMessage}
          close={() => setShowWaitingModal(false)}
        />
      </MenuWrapper>
      <MenuWrapper
        open={showConfirmationCardClaim}
        onClose={() => setShowConfirmationCardClaim(false)}
      >
        <ConfirmationCardClaim
          close={() => setShowConfirmationCardClaim(false)}
        />
      </MenuWrapper>{" "}
      <CardTranslucent back>
        <CloseButton onClick={() => setIsFlipped(!isFlipped)} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {metadata && (
            <ImageSquare
              src={teamNFT[metadata.properties.shortForm]}
              alt="nft_square"
            />
          )}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {metadata && (
                <CountryFlag
                  src={teamLogos && teamLogos[metadata.properties.shortForm]}
                />
              )}{" "}
              <Country>{metadata?.name}</Country>
            </Box>
            <Tournament>ICC T20 WORLD CUP</Tournament>
          </Box>
        </Box>

        <InputAmountBox>
          <InputLabel>{"Enter Quantity to claim rewards for :"}</InputLabel>
          <InputAmount
            value={amount}
            type="text"
            onChange={(e) => {
              if (regex.test(e.target.value)) setAmount(e.target.value);
            }}
          />
        </InputAmountBox>
        <TotalAmountBox>
          <InputLabel>{"Total Amount"}</InputLabel>
          <TotalAmount>
            <CurrencyImage src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=006" />{" "}
            {reward}
          </TotalAmount>
        </TotalAmountBox>
        <ButtonBlue
          disabled={!!error}
          onClick={() => {
            getReward();
          }}
        >
          {error ? error : "Claim"}
        </ButtonBlue>
      </CardTranslucent>
      <CardTranslucent>
        <Box>
          {/* {metadata ? (
            <ImageNft src={teamNFT[metadata.properties.shortForm]} alt="nft" />
          ) : (
            <ImageNft
              src={placeholder}
              alt="placeholder"
            />
          )} */}
          {image ? (
            <ImageNft src={image} alt="nft" />
          ) : (
            <ImageLoader>
              <ImageNft src={whiteblock} alt="placeholder" />
              <CircularProgress
                sx={{
                  color: "#FF3F86",
                  position: "absolute",
                  top: "calc(50% - 20px)",
                  left: "calc(50% - 20px)",
                }}
              />
            </ImageLoader>
          )}
          <Box
            mt={1}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {metadata && (
                <CountryFlag
                  src={teamLogos && teamLogos[metadata.properties.shortForm]}
                />
              )}
              <Country>{metadata?.name}</Country>{" "}
            </Box>
            <Tournament>ICC T20 WORLD CUP</Tournament>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Text
              textAlign="left"
              color="gray"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="normal"
            >
              You Own: {balance?.toString()}
            </Text>
            <Text
              textAlign="left"
              color="gray"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="normal"
            >
              Minted: {minted?.toString()}
            </Text>
            {(winner?.eq(id) || runnerUp?.eq(id)) && (
              <Text
                textAlign="left"
                color="gray"
                fontSize="16px"
                lineHeight="24px"
                fontWeight="normal"
              >
                Reward: {totalReward}
              </Text>
            )}
          </Box>
          <Box>
            {metadata?.properties?.type === "normal" && (
              <>
                <Text
                  textAlign="right"
                  color="gray"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight="normal"
                >
                  Winner Reward:{" "}
                  {rewardPoolLocked &&
                    minted &&
                    basePrice &&
                    ethers.BigNumber.from(rewardPoolLocked)
                      .mul(60)
                      .div(10)
                      ?.div(minted.add(1).mul(basePrice))
                      ?.toNumber() / 10}
                  X
                </Text>
                <Text
                  textAlign="right"
                  color="gray"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight="normal"
                >
                  Runner-Up Reward:{" "}
                  {rewardPoolLocked &&
                    minted &&
                    basePrice &&
                    ethers.BigNumber.from(rewardPoolLocked)
                      .mul(30)
                      .div(10)
                      ?.div(minted.add(1).mul(basePrice))
                      ?.toNumber() / 10}
                  X
                </Text>
              </>
            )}
          </Box>
        </Box>
        {claimable && metadata?.properties.type === "normal" && (
          <ButtonBlue
            disabled={!(winner?.eq(id) || runnerUp?.eq(id))}
            onClick={() => {
              setIsFlipped(true);
            }}
          >
            {winner?.eq(id) || runnerUp?.eq(id) ? "Claim" : "No Reward"}
          </ButtonBlue>
        )}
        {metadata?.properties.type === "winner" && (
          <ButtonGold>{"Winner"}</ButtonGold>
        )}
        {metadata?.properties.type === "runnerUp" && (
          <ButtonSilver>{"Runner Up"}</ButtonSilver>
        )}
      </CardTranslucent>
    </Card>
  );
};

export default MyNftCard;
