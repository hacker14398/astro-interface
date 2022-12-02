import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import React from "react";
import styled from "styled-components";
import YODA from "../assets/YodaLogo.svg";
import ScreenFive from "./HomePage/ScreenFive";
import ScreenSix from "./HomePage/ScreenSix";
import NewWeb from "../assets/web3.png";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
import ListItemIcon from "@mui/material/ListItemIcon";

const Wrapper = styled.div`
  // position: absolute;
  // bottom: 0px;
  backdrop-filter: blur(50px);
  -webkit-backdrop-filter: blur(50px);
`;
const StyledFooterDiv = styled.div`
  &&& {
    margin-top: 80px;
    display: flex;
    justify-content: space-around;
    height: 318px;
    color: white;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 16px;
    /* or 160% */
    text-align: center;
    /* secondary color */
    bottom: 0;
    color: #5d9197;
    // background: #142828;
    ${({ theme }) => theme.mediaWidth.upToSmall`
  &&&{
    padding: 7px 7px;
    margin-top: 0px
  }
`}
  }
`;
const StyledGreyLine = styled.div`
  width: 100%;
  mix-blend-mode: normal;
  border: 1px solid #0d3b3a;
`;
const Logo = styled.img`
  &&& {
    margin: auto;
    width: 136px;
    height: 30px;
  }
`;
const StyledStack = styled(Stack)`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;
const Icons = styled.div`
  &&& {
    display: flex;
    margin: auto;
  }
`;
const StyledListItemIcon = styled(ListItemIcon)`
  &&& {
    min-width: 40px;
    color: white;
    :hover {
      color: #00a576;
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
`};
  }
`;
const StyledButton = styled(Button)`
  &&& {
    width: 118.9px;
    height: 38px;
    border: 1px solid white;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.01em;
    color: white;
    :hover {
      border: 1px solid #00a576;
      color: #00a576;
    }
  }
`;
const StyledText = styled(Typography)`
  &&& {
    padding: 7px 14px 50px 14px;
    margin: -75px auto;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 16px;
    /* or 160% */
    text-align: center;
    max-width: 920px;
    /* secondary color */
    text-align: center;
    color: #5d9197;
    ${({ theme }) => theme.mediaWidth.upToSmall`
  &&&{
    margin: -75px auto;
 }
`}
  }
`;

const NewToWeb3 = styled.div`
  &&& {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 24px 8px 8px;
    width: 900px;
    height: 208px;
    background: #00a576;
    border-radius: 8px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    &&&{
      display: none;
   }
  `}
  }
`;
const ContextText = styled.div`
  display: grid;
  margin-left: 32px;
  text-align: left;
`;
const Web3 = styled.img`
  &&& {
    width: 193.53px;
    height: 194px;
  }
`;
const HeadLine = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
  }
`;
const TextLine = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-top: 16.5px;
  }
`;
const StyledButton2 = styled(Button)`
  &&& {
    width: 118.9px;
    height: 38px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 19px;
    color: white;
    margin-top: 35px;
    :hover {
      border: 1px solid #131a1f;
      color: #131a1f;
    }
  }
`;
const LogoDiv = styled.div`
  &&& {
    margin-top: 20px;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <StyledGreyLine />
      <StyledFooterDiv>
        <NewToWeb3>
          <Web3 src={NewWeb} />
          <ContextText>
            <HeadLine> New to Web3?</HeadLine>
            <TextLine>
              {" "}
              Web3 is the future of the internet, and crypto is its financial
              layer. To learn more about Web3 and to get started, follow this
              guide
            </TextLine>
            <StyledButton2
              onClick={() =>
                window.open(
                  "https://medium.com/@yodadotxyz/how-to-add-funds-on-metamask-polygon-matic-network-eacb4946033a",
                  "_blank"
                )
              }
            >
              {" "}
              Read More
            </StyledButton2>
          </ContextText>
        </NewToWeb3>
        <LogoDiv>
          <Logo src={YODA} />
          <StyledStack direction="row" spacing={1}>
            <Icons>
              <StyledListItemIcon
                onClick={() =>
                  window.open("https://twitter.com/yoda_xyz", "_blank")
                }
              >
                <TwitterIcon />
              </StyledListItemIcon>
              <StyledListItemIcon
                onClick={() => window.open("https://t.me/YODAxyz", "_blank")}
              >
                <TelegramIcon />
              </StyledListItemIcon>
            </Icons>
          </StyledStack>
          <StyledStack spacing={2} direction="row">
            <StyledButton
              onClick={() =>
                window.open(
                  "https://yoda-xyz.gitbook.io/wiki/using-yoda/faqs",
                  "_blank"
                )
              }
            >
              FAQs
            </StyledButton>
            <StyledButton
              onClick={() =>
                window.open("https://yoda-xyz.gitbook.io/wiki/", "_blank")
              }
            >
              Docs
            </StyledButton>
          </StyledStack>
        </LogoDiv>
      </StyledFooterDiv>

      <StyledText>
        “Disclaimer : Yoda provides the opportunity to users to predict outcomes
        of real-world events using the power of smart contracts and web 3
        enabled wallets. We recommend looking at past data and statistics to
        make informed predictions on markets hosted on Yoda. Please refrain from
        using Yoda in case you are below 18 years of age. Do check the
        regulations in your country before using Yoda. Yoda should not be used
        in case you are a resident of the US or any other jurisdiction which
        prohibits usage of prediction markets based products.”
      </StyledText>
    </Wrapper>
  );
}

export default Footer;
