import { Grid, Box, Skeleton } from "@mui/material";
import styled from "styled-components";
import { ButtonBlue, ButtonGreen } from "../../components/Button";
import NftCard from "../../components/nft/NftCard";
import Illustration from "../../assets/images/nft/illustration.svg";
import { useHistory } from "react-router-dom";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import useNftInfo from "../../hooks/useNftInfo";
import { maticNft, gameToken, network } from "../../config/Constants";
import claimReward from "../../assets/banner.png";
import {
  getApproval,
  setApproval,
  // call,
} from "../../config/NftContractFunctions";
import { BigNumber } from "@ethersproject/bignumber";
import { useState, useEffect, useCallback } from "react";
import { formatUnits } from "@ethersproject/units";
import { ethers } from "ethers";
import useNftDerivedInfo from "../../hooks/useNftDerivedInfo";
import { WaitingCard } from "../../components/TransactionsCards/WaitingCard";
import MenuWrapper from "../../components/MenuWrapper";
import toast, { Toaster } from "react-hot-toast";

import { useUpdateInfo } from "../../state/nft/hooks";
import HowItWorksModal from "../../components/nft/HowItWorksModal";
import secondsToDHms from "../../utils/secondsToDHms";
import useInterval from "../../hooks/useInterval";
import numToArray from "../../utils/numToArray";
import ConfirmationCardNft, {
  ConfirmationCardApproveForNft,
} from "../../components/nft/TransactionsCards/ConfirmationCardNft";
import { switchNetworkInMetamask } from "../../utils/metamaskFunctions";
import { useChainId } from "../../state/wallet/hooks";
const Banner = styled.div`
  &&& {
    padding: 32px;
    opacity: 1;
    border-radius: 15px;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid #4c4b4b14;
    box-shadow: 12px 12px 25px #1a1b1c73;
    background: linear-gradient(91.56deg, #131a1e 44.93%, #003022 140.31%);
    margin: 10px 85px;
    position: relative;
    display: flex;
    overflow: hidden;
    max-width: 2100px;
    @media only screen and (max-width: 900px) {
      flex-direction: column;
    }
    @media only screen and (min-width: 2100px) {
      margin-right: auto;
      margin-left: auto;
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
  &&&{
    margin: 5px;
  
  }
  `};
  }
`;
const TotalAmountBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 8px 12px 16px;
  border: 1px solid #2d2f35;
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  order: 3;
  align-self: stretch;
  flex-grow: 0;
  margin: 10px 0px;
`;
const TotalAmountLabel = styled.h1`
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.white1};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 4px 0px;
`;
const TotalAmount = styled.p`
  outline: none;
  background: none;
  border: none;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.green1};
`;
const BannerLeft = styled(Box)`
  flex-grow: 4;
  display: flex;
`;
const BannerRight = styled(Box)`
  flex-grow: 1;
`;
const Text = styled.p<{
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
    if (color === "yellow") return "#F2C94C";
    return theme.white1;
  }};
`;
const BannerHeader = styled(Text)`
  text-transform: uppercase;
  font-size: 28px;
  line-height: 44px;
  @media only screen and (max-width: 475px) {
    font-size: 24px;
    line-height: 26px;
  }
`;
const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const BannerImage = styled.img`
  margin-right: 30px;
  @media only screen and (max-width: 900px) {
    margin-right: 0;
  }
`;
const BannerTimer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 12px 12px 12px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  box-sizing: border-box;
  border-radius: 8px;
  flex: none;
  order: 2;
  width: fit-content;
  margin-top: auto;
`;
export const ParentGrid = styled(Grid)`
  display: inline-flex;
  flex-wrap: wrap;
  margin: calc(-1 * 8px) 0 0 calc(-1 * 8px);
  width: calc(100% + 8px);
  max-width: 2100px;
  @media only screen and (min-width: 2100px) {
    margin-right: auto;
    margin-left: auto;
  }
  /* & > * {
    margin: 8px 0 0 8px;
  } */
`;
const BlueUnderline = styled.span`
  color: #00a576;
  text-decoration: underline;
  text-decoration-color: #00a576;
  word-wrap: nowrap;
  cursor: pointer;
`;
const ClaimRewardBanner = styled.img`
  &&& {
    border-radius: 15px;
    /* display: flex;
  justify-content: center;*/
    position: relative;
    width: 100%;
    object-fit: contain;
    max-width: 600px;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
    ${({ theme }) => theme.mediaWidth.upToSmall`
  &&&{
    margin: 5px;
  
  }
  `};
  }
`;
const SmallButtonBlue = styled(ButtonGreen)`
  &&&& {
    margin-top: 20px;
    padding: 10px 0;
    max-width: 140px;
  }
`;
const Nft = () => {
  const history = useHistory();
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [buyable, setBuyable] = useState(true);
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const [waitingCardMessage, setWaitingCardMessage] = useState("");
  const { currentAccountAddress } = useWeb3Modal();
  const [chainId] = useChainId();
  const [showConfirmationCard, setShowConfirmationCard] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [approvalAmount, setApprovalAmount] = useState<BigNumber | undefined>();
  const {
    basePrice,
    endTime,
    totalTeams,
    rewardPoolLocked,
    winner,
    winnerTotalLocked,
  } = useNftInfo();
  const [timeStamp, setTimeStamp] = useState(Math.round(Date.now() / 1000));
  const { minted, images, metadata } = useNftDerivedInfo();
  const [updateInfo, setUpdateInfo] = useUpdateInfo();
  const [showApproveCard, setShowApproveCard] = useState(false);
  const getUserApproval = async () => {
    if (window?.web3Provider)
      setApprovalAmount(
        await getApproval({
          userAddress: currentAccountAddress,
          spenderAddress: maticNft,
          tokenDecimals: gameToken.decimals,
        })
      );
  };
  const setUserApproval = async () => {
    setShowWaitingModal(true);
    setWaitingCardMessage("Approving");
    const res = await setApproval({
      recipient: maticNft,
      signer: window.web3Provider.getSigner(),
    });
    setShowWaitingModal(false);
    if (res) {
      //alert("Success");
      toast.success("Approve Successful");
      setShowApproveCard(true);
      setApprovalAmount(ethers.constants.MaxUint256);
      setUpdateInfo(!updateInfo);
    } else {
      toast.error("Approve Fail");
      //alert("Fail");
    }
  };
  useInterval(() => {
    setTimeStamp(Date.now() / 1000);
  }, 1000);
  useEffect(() => {
    getUserApproval();
  }, [currentAccountAddress]);

  useEffect(() => {
    if (endTime) {
      if (ethers.BigNumber.from(endTime).lt(Math.round(Date.now() / 1000)))
        setBuyable(false);
      else {
        setBuyable(true);
      }
    }
  }, [endTime]);
  const closeShowHowItWorksModal = () => {
    setShowHowItWorksModal(false);
  };
  const changeNetwork = useCallback(async () => {
    if (network.networkId !== chainId) {
      await switchNetworkInMetamask(0);
      return;
    }
  }, [network.networkId, chainId, switchNetworkInMetamask]);
  useEffect(() => {
    changeNetwork();
  }, [changeNetwork]);
  return (
    <Box p={{ xs: 1, sm: 4 }}>
      <MenuWrapper
        open={showConfirmationCard}
        onClose={() => setShowConfirmationCard(false)}
      >
        <ConfirmationCardNft
          link={confirmationMessage}
          close={() => setShowConfirmationCard(false)}
        />
      </MenuWrapper>
      <MenuWrapper
        open={showHowItWorksModal}
        onClose={closeShowHowItWorksModal}
      >
        <HowItWorksModal close={closeShowHowItWorksModal} />
      </MenuWrapper>
      <Toaster position="top-right" reverseOrder={false} />
      <MenuWrapper
        open={showWaitingModal}
        onClose={() => setShowWaitingModal(false)}
      >
        <WaitingCard
          message={waitingCardMessage}
          close={() => setShowWaitingModal(false)}
        />
      </MenuWrapper>{" "}
      <MenuWrapper
        open={showApproveCard}
        onClose={() => setShowApproveCard(false)}
      >
        <ConfirmationCardApproveForNft
          close={() => setShowApproveCard(false)}
        />
      </MenuWrapper>{" "}
      <Banner>
        <BannerLeft>
          <BannerContent>
            <BannerHeader fontWeight="bold">
              Support your favourite team and win rewards
            </BannerHeader>
            <Text fontSize="14px" lineHeight="24px">
              Prediction Market is in BETA, use at your own risk!{" "}
              <BlueUnderline onClick={() => setShowHowItWorksModal(true)}>
                How does it work?
              </BlueUnderline>
            </Text>
            <BannerTimer>
              <Text fontSize="16px" lineHeight="19px">
                {endTime ? (
                  parseInt(endTime) - timeStamp > 0 ? (
                    "NFT Sale Ends In"
                  ) : (
                    winnerTotalLocked &&
                    (ethers.BigNumber.from(winnerTotalLocked).eq(
                      ethers.constants.Zero
                    )
                      ? "Sale has ended"
                      : "Sale has ended. You can now claim rewards!")
                  )
                ) : (
                  <Skeleton variant="rectangular" height={40} width={100} />
                )}
              </Text>
              {endTime && (
                <Text
                  style={{ marginTop: "4px" }}
                  fontSize="14px"
                  lineHeight="17px"
                  color="yellow"
                >
                  {endTime &&
                    parseInt(endTime) - timeStamp > 0 &&
                    secondsToDHms(parseInt(endTime) - timeStamp, true)}
                </Text>
              )}
            </BannerTimer>
          </BannerContent>
          <BannerImage src={Illustration} alt="illustration" />
        </BannerLeft>
        <BannerRight>
          <TotalAmountBox>
            <TotalAmountLabel>Total Reward Pool</TotalAmountLabel>
            <TotalAmount>
              {rewardPoolLocked ? (
                <>$ {formatUnits(rewardPoolLocked, gameToken.decimals)}</>
              ) : (
                <Skeleton width="60%" />
              )}
            </TotalAmount>
          </TotalAmountBox>
          <ButtonGreen onClick={() => history.push("/nft/mynfts")}>
            View My NFTs
          </ButtonGreen>
        </BannerRight>
      </Banner>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ClaimRewardBanner src={claimReward} alt="banner" />
        <SmallButtonBlue
          onClick={() => history.push("/nft/mynfts")}
          width="200px"
        >
          Claim Reward
        </SmallButtonBlue>
      </div>
      {/* <ParentGrid container>
        {totalTeams &&
          numToArray(parseInt(totalTeams)).map((item, i) => {
            return (
              <Grid
                pt={2}
                pl={2}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                height={{ lg: "530px", xl: "700px", sm: "550px", xs: "600px" }}
                minWidth={{ xl: "350px", sm: "0px" }}
              >
                <NftCard
                  approvalAmount={approvalAmount}
                  setUserApproval={setUserApproval}
                  id={i}
                  key={i}
                  image={images[i]}
                  metadata={metadata[i]}
                  basePrice={
                    basePrice ? ethers.BigNumber.from(basePrice) : undefined
                  }
                  minted={
                    minted[i] ? ethers.BigNumber.from(minted[i]) : undefined
                  }
                  buyable={buyable}
                  setShowConfirmationCard={setShowConfirmationCard}
                  setConfirmationMessage={setConfirmationMessage}
                />
              </Grid>
            );
          })}
      </ParentGrid> */}
    </Box>
  );
};

export default Nft;
