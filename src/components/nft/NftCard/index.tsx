import { gameToken, network, teamNFT } from "../../../config/Constants";
import { Box } from "@mui/system";
import styled from "styled-components";
import { ButtonBlue } from "../../Button";
import LazyLoad from "react-lazyload";
import whiteblock from "../../../assets/images/nft/whiteback.png";
import toast, { Toaster } from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";
import { buyToken } from "../../../config/NftContractFunctions";
import useWeb3Modal from "../../../hooks/useWeb3Modal";
import { WaitingCard } from "../../TransactionsCards/WaitingCard";
import MenuWrapper from "../../MenuWrapper";
import ConfirmationCardNft from "../TransactionsCards/ConfirmationCardNft";
import { useExplorerLink, useTeamLogos } from "../../../state/questions/hooks";
import { ethers } from "ethers";
import { useUpdateInfo } from "../../../state/nft/hooks";
import useNftUserInfo from "../../../hooks/useNftUserInfo";
import { useWalletModal } from "../../../state/wallet/hooks";
import useNftInfo from "../../../hooks/useNftInfo";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { padAndHexConvertor } from "../../../utils";
import { Metadata } from "../../../state/nft/slice";
import placeholder from "../../../assets/images/nft/placeholder.svg";
import { CircularProgress } from "@mui/material";
import ReactGA from "react-ga4";

export const CardTranslucent = styled.div<{
  padding?: string;
  width?: string;
  borderRadius?: string;
  back?: boolean;
  isFlipped?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  opacity: 1;
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  position: absolute;
  padding: 16px;
  /* -webkit-backface-visibility: hidden;
  backface-visibility: hidden; */
  /* -webkit-perspective: 0; */
  transform: ${({ back }) => (back ? "rotateY(180deg)" : "rotateY(0deg)")};
  z-index: ${({ back, isFlipped }) =>
    back ? (isFlipped ? 5 : 0) : isFlipped ? 0 : 5};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fffdfd11;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
`;
export const ImageNft = styled.img`
  border-radius: 8px;
  width: 100%;
  object-fit: contain;
`;
export const ImageSquare = styled.img`
  border-radius: 4px;
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
export const Tournament = styled.div`
  background: rgba(18, 116, 196, 0.2);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1px 12px;
  text-transform: capitalize;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.white1};
`;
export const Country = styled.h1`
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.white1};
`;
export const Text = styled.p<{
  fontSize?: string;
  fontWeight?: string | number;
  color?: string;
  lineHeight?: string;
  textAlign?: string;
}>`
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 400)};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "24px")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  letter-spacing: 0.01em;
  color: ${({ theme, color }) => {
    if (color === "gray") return theme.gray2;
    return theme.white1;
  }};
`;
export const CountryFlag = styled.img`
  height: 21px;
  object-fit: contain;
  margin-right: 3px;
`;
export const InputAmountBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px 12px 16px;
  background: #linear-gradient(90deg, #142828 0%, #14191e 100%);
  border: 1px solid ${({ theme }) => theme.primary1};
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
`;
export const InputAmount = styled.input`
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #d1d1d1;
  font-family: Roboto;
`;
export const TotalAmount = styled.span`
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: #d1d1d1;
  display: flex;
  align-items: center;
`;
export const InputLabel = styled.h1`
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.primary1};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 4px 0px;
`;
export const TotalAmountBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px 12px 16px;
  border: 1px solid ${({ theme }) => theme.primary1};
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
  margin-bottom: 10px;
`;
export const CloseButton = styled(CloseIcon)`
  &&& {
    margin: 16px;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    user-select: all;
    z-index: 2;
  }
`;
export const Card = styled.div<{
  isFlipped?: boolean;
}>`
  width: 100%;
  height: 100%;
  transition: transform 1s;
  -webkit-transition: transform 1s;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  position: relative;
  transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
  -webkit-transform: ${({ isFlipped }) =>
    isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"};
`;
export const CurrencyImage = styled.img<{}>`
  object-fit: contain;
  height: 25px;
  margin: 2px;
`;
export const ImageLoader = styled.div`
  width: 100%;
  position: relative;
`;
interface NftCardProps {
  setUserApproval: () => void;
  approvalAmount: BigNumber | undefined;
  basePrice: BigNumber | undefined;
  id: number;
  minted: BigNumber | undefined;
  buyable: boolean;
  image: string | undefined;
  metadata: Metadata | undefined;
  setShowConfirmationCard: (arg0: boolean) => void;
  setConfirmationMessage: (arg0: string) => void;
}

const regex = /^\d*$/;
const NftCard: React.FC<NftCardProps> = ({
  setUserApproval,
  approvalAmount,
  id,
  basePrice,
  minted,
  buyable,
  image,
  metadata,
  setShowConfirmationCard,
  setConfirmationMessage,
}) => {
  const [showWalletModal, setShowWalletModal] = useWalletModal();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [, setExplorerLink] = useExplorerLink();
  const [waitingCardMessage, setWaitingCardMessage] = useState("");
  const [amount, setAmount] = useState("0");
  const [updateInfo, setUpdateInfo] = useUpdateInfo();
  const { currentAccountAddress } = useWeb3Modal();
  const { rewardPoolLocked, uri } = useNftInfo();
  const [error, setError] = useState<string | undefined>(undefined);
  const { usdcBalance } = useNftUserInfo();
  const [teamLogos] = useTeamLogos();
  const buyNft = async () => {
    setShowWaitingModal(true);
    setWaitingCardMessage("Buying Nft");
    const tx = await buyToken({
      id,
      amount,
      signer: window.web3Provider.getSigner(),
    });
    if (!tx) {
      setShowWaitingModal(false);
      toast.error("Buying Failed");
    } else {
      let result = await window.web3Provider.waitForTransaction(tx.hash);
      if (result.status == 1) {
        setShowWaitingModal(false);
        setConfirmationMessage(`${metadata?.name}`);
        setShowConfirmationCard(true);
        //use network for mainnet
        setExplorerLink(network.explorer + tx.hash);
        ReactGA.event({
          category: "Buy NFT",
          action: `Buying ${id} NFT`,
        });
        setShowWaitingModal(false);
        setUpdateInfo(!updateInfo);
      } else {
        toast.error("Buying Failed");
      }
    }
  };
  const approvalDone =
    approvalAmount &&
    approvalAmount.gte(
      basePrice ? basePrice?.mul(amount === "" ? "0" : amount) : 0
    );
  useEffect(() => {
    if (amount === "" || amount === "." || amount === "0")
      setError("Enter Amount");
    else if (
      usdcBalance &&
      ethers.BigNumber.from(usdcBalance).lt(
        basePrice ? basePrice?.mul(amount === "" ? "0" : amount) : 0
      )
    )
      setError("Insufficient Balance");
    else setError(undefined);
  }, [amount, usdcBalance]);
  console.log(image);
  return (
    <>
      <MenuWrapper
        open={showWaitingModal}
        onClose={() => setShowWaitingModal(false)}
      >
        <WaitingCard
          message={waitingCardMessage}
          close={() => setShowWaitingModal(false)}
        />
      </MenuWrapper>

      <Card isFlipped={isFlipped}>
        <CardTranslucent back isFlipped={isFlipped}>
          <CloseButton
            onClick={() => {
              setAmount("0");
              setIsFlipped(!isFlipped);
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {image && <ImageSquare src={image} alt="nft_square" />}
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
                )}
                <Country>{metadata?.name}</Country>
              </Box>
              <Tournament>ICC T20 WORLD CUP</Tournament>
            </Box>
          </Box>
          <Box py={2}>
            <Text
              textAlign="right"
              color="gray"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="normal"
            >
              Price
            </Text>
            <Text
              textAlign="right"
              color="white"
              fontSize="24px"
              lineHeight="30px"
              fontWeight="bold"
            >
              $ {basePrice && formatUnits(basePrice, gameToken.decimals)}
            </Text>
          </Box>
          <InputAmountBox>
            <InputLabel>{"Enter Quantity :"}</InputLabel>
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
              <CurrencyImage src="https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=006" />
              {basePrice &&
                formatUnits(
                  basePrice?.mul(amount === "" ? "0" : amount),
                  gameToken.decimals
                )}
            </TotalAmount>
          </TotalAmountBox>
          {!currentAccountAddress && (
            <ButtonBlue onClick={() => setShowWalletModal(true)}>
              Connect Wallet
            </ButtonBlue>
          )}
          {currentAccountAddress && (
            <ButtonBlue
              disabled={!!error}
              onClick={() => {
                if (approvalDone) {
                  buyNft();
                } else {
                  setUserApproval();
                }
              }}
            >
              {error ? error : approvalDone ? "Buy Now" : "Approve"}
            </ButtonBlue>
          )}
        </CardTranslucent>
        <CardTranslucent isFlipped={isFlipped}>
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
              <LazyLoad height={250} once>
                <ImageNft src={image} alt="nft" />
              </LazyLoad>
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
                <Country>{metadata?.name}</Country>
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
              {metadata?.properties.type === "normal" && (
                <>
                  <Text
                    textAlign="left"
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
                    textAlign="left"
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
              <Text
                textAlign="left"
                color="gray"
                fontSize="16px"
                lineHeight="24px"
                fontWeight="normal"
              >
                Minted: {minted?.toString()}
              </Text>
            </Box>
            {metadata?.properties.type === "normal" && (
              <Box py={2}>
                <Text
                  textAlign="right"
                  color="gray"
                  fontSize="16px"
                  lineHeight="24px"
                  fontWeight="normal"
                >
                  Price
                </Text>
                <Text
                  textAlign="right"
                  color="white"
                  fontSize="24px"
                  lineHeight="30px"
                  fontWeight="bold"
                >
                  $ {basePrice && formatUnits(basePrice, gameToken.decimals)}
                </Text>
              </Box>
            )}
          </Box>
          <ButtonBlue
            disabled={!buyable}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            {buyable ? "Buy Now" : "Sale Ended"}
          </ButtonBlue>
        </CardTranslucent>
      </Card>
    </>
  );
};

export default NftCard;
