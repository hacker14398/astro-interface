import { Grid, Box, Skeleton } from "@mui/material";
import styled from "styled-components";
import { ButtonBlue, ButtonGreen } from "../../components/Button";
import MyNftCard from "../../components/nft/MyNftCard";
import Illustration from "../../assets/images/nft/illustration.svg";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ParentGrid } from "../Nft";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import beEligible from "../../assets/beEligible__banner.png";
import { formatUnits } from "@ethersproject/units";
import { maticNft, gameToken, network } from "../../config/Constants";
import useNftInfo from "../../hooks/useNftInfo";
import useNftDerivedInfo from "../../hooks/useNftDerivedInfo";
import useNftUserInfo from "../../hooks/useNftUserInfo";
import { ethers } from "ethers";
import bannerImage from "../../assets/images/nft/website_banners__yoda_-04_720.png";
import walletConnectImage from "../../assets/images/nft/connect__wallet.png";
import MenuWrapper from "../../components/MenuWrapper";
import HowItWorksModal from "../../components/nft/HowItWorksModal";
import useInterval from "../../hooks/useInterval";
import secondsToDHms from "../../utils/secondsToDHms";
import numToArray from "../../utils/numToArray";
import { switchNetworkInMetamask } from "../../utils/metamaskFunctions";
import { useChainId, useWalletModal } from "../../state/wallet/hooks";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Twitter from "@mui/icons-material/Twitter";
import Telegram from "@mui/icons-material/Telegram";
const Wrapper = styled.div`
  color: ${({ theme }) => theme.text1};
  display: flex;
  opacity: 1;
  border-radius: 15px;
  backdrop-filter: opacity(0.3);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  background: transparent;
  grid-template-rows: auto auto;
  padding-top: 0;
`;
const StyledCloseIcon = styled(CloseRoundedIcon)`
  position: absolute;
  color: white;
  right: 15px;
  top: 15px;
  width: 1.7rem !important;
  height: 1.7rem !important;
  cursor: pointer;
`;
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
const Banner2 = styled.div`
  padding: 32px;
  opacity: 1;
  border-radius: 15px;
  /* backdrop-filter: blur(30px); */
  /* -webkit-backdrop-filter: blur(30px); */
  /* border: 1px solid #4c4b4b14; */
  /* box-shadow: 12px 12px 25px #1a1b1c73; */
  /* background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    linear-gradient(271.37deg, #bc677b -7.78%, #55b6f1 110.35%); */
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
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
const Banner2Header = styled(Text)`
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 25px;
  @media only screen and (max-width: 475px) {
    margin-bottom: 20px;
    font-size: 16px;
    line-height: 22px;
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
const SmallButtonBlue = styled(ButtonBlue)`
  &&&& {
    padding: 10px 0;
    max-width: 140px;
  }
`;
const SmallButtonSocialBlue = styled(ButtonGreen)`
  &&&& {
    margin: 4px;
    padding: 10px 0;
    max-width: 40px;
  }
`;

const BeEligibleBanner = styled.img`
  border-radius: 15px;
  width: 100%;
  object-fit: contain;
  max-width: 600px;
  margin-right: auto;
  margin-left: auto;
`;
const BlueUnderline = styled.span`
  color: #00a576;
  text-decoration: underline;
  text-decoration-color: #00a576;
  word-wrap: nowrap;
  cursor: pointer;
`;
const TwitterWrapper = styled.span`
  display: flex;
  border-radius: 50%;
  padding: 5px;
  background: rgb(29, 155, 240);
  color: #fff;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;
const MyNft = () => {
  const history = useHistory();
  const [showWalletModal, setShowWalletModal] = useWalletModal();
  const [beEligibleModal, setBeEligibleModal] = useState(false);
  const [claimable, setClaimable] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const { currentAccountAddress } = useWeb3Modal();
  const [chainId] = useChainId();
  const { userBalances } = useNftUserInfo();
  const {
    winnerTotalLocked,
    endTime,
    winner,
    runnerUp,
    rewardPoolLocked,
    totalTeams,
  } = useNftInfo();
  const { minted, images, metadata } = useNftDerivedInfo();
  const [timeStamp, setTimeStamp] = useState(Math.round(Date.now() / 1000));
  useInterval(() => {
    setTimeStamp(Date.now() / 1000);
  }, 1000);
  useEffect(() => {
    if (window.web3Provider && endTime) {
      if (
        ethers.BigNumber.from(endTime).lt(Math.round(Date.now() / 1000)) &&
        winnerTotalLocked &&
        !ethers.BigNumber.from(winnerTotalLocked).eq(ethers.constants.Zero)
      )
        setClaimable(true);
    }
  }, [endTime, winnerTotalLocked]);
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
  const tweetUrl = `https://twitter.com/share?url=https://www.yoda.xyz&via=yoda_xyz&text=`;

  return (
    <Box p={{ xs: 1, sm: 4 }}>
      <MenuWrapper
        open={showHowItWorksModal}
        onClose={closeShowHowItWorksModal}
      >
        <HowItWorksModal close={closeShowHowItWorksModal} />
      </MenuWrapper>
      <MenuWrapper
        open={beEligibleModal}
        onClose={() => {
          setBeEligibleModal(false);
        }}
      >
        <Wrapper>
          <StyledCloseIcon
            onClick={() => {
              setBeEligibleModal(false);
            }}
          />
          <BeEligibleBanner src={beEligible} />
          <TwitterWrapper
            onClick={() =>
              window.open(
                tweetUrl,
                "_blank",
                "resizable=yes,top=300,left=500,width=600,height=400"
              )
            }
          >
            <Twitter />
          </TwitterWrapper>
        </Wrapper>
      </MenuWrapper>
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
          {/* <ButtonBlue onClick={() => history.push("/nft")}>Buy NFTs</ButtonBlue> */}
        </BannerRight>
      </Banner>

      {currentAccountAddress && totalNoOfNfts(userBalances) <= 0 && (
        <Banner2>
          <Banner2Header fontWeight="bold">
            Looks like you haven't purchased any NFTs yet, join our Social Media
            channels to stay updated on the next NFT release.
          </Banner2Header>
          <div style={{ display: "flex" }}>
            <SmallButtonSocialBlue
              onClick={() =>
                window.open(
                  "https://twitter.com/yoda_xyz",
                  "_blank",
                  "resizable=yes,top=300,left=500,width=600,height=400"
                )
              }
              width="200px"
            >
              <Twitter />
            </SmallButtonSocialBlue>
            <SmallButtonSocialBlue
              onClick={() =>
                window.open(
                  "https://t.co/WRT2nqQiy3?amp=1",
                  "_blank",
                  "resizable=yes,top=300,left=500,width=600,height=400"
                )
              }
              width="200px"
            >
              <Telegram />
            </SmallButtonSocialBlue>
          </div>
        </Banner2>
      )}
      {/* 
      {currentAccountAddress && totalNoOfNfts(userBalances) <= 0 && (
        <Banner2>
          <Banner2Header fontWeight="bold">
            Looks like you haven't purchased any NFTs yet, buy a NFT to stand a
            chance to win exciting rewards.
          </Banner2Header>
          <SmallButtonBlue onClick={() => history.push("/nft")} width="200px">
            Buy Nfts
          </SmallButtonBlue>
        </Banner2>
      )} */}
      {!currentAccountAddress && (
        <Banner2>
          <Banner2Header fontWeight="bold">
            Please Connect your Wallet to view your NFTs.
          </Banner2Header>
          <SmallButtonBlue
            onClick={() => setShowWalletModal(true)}
            width="200px"
          >
            Connect Wallet
          </SmallButtonBlue>
        </Banner2>
      )}
      <ParentGrid container>
        {totalTeams &&
          numToArray(parseInt(totalTeams)).map((item, i) => {
            if (
              !userBalances[i] ||
              ethers.BigNumber.from(userBalances[i])?.isZero()
            ) {
              return <></>;
            }
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
                minWidth={{ xl: "400px", sm: "0px" }}
              >
                <MyNftCard
                  setBeEligibleModal={setBeEligibleModal}
                  winner={winner ? ethers.BigNumber.from(winner) : undefined}
                  runnerUp={
                    runnerUp ? ethers.BigNumber.from(runnerUp) : undefined
                  }
                  id={i}
                  key={i}
                  image={images[i]}
                  metadata={metadata[i]}
                  claimable={claimable}
                  balance={
                    userBalances[i]
                      ? ethers.BigNumber.from(userBalances[i])
                      : undefined
                  }
                  minted={
                    minted[i] ? ethers.BigNumber.from(minted[i]) : undefined
                  }
                />
              </Grid>
            );
          })}
      </ParentGrid>
    </Box>
  );
};

export default MyNft;

const totalNoOfNfts = (userBalances: (string | undefined)[]) => {
  const total = userBalances.reduce((sum, current) => {
    if (current) return sum + parseInt(current);
    else return sum;
  }, 0);
  return total;
};
