import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import BGimg1 from "../../assets/screenTwoBG.svg";
import BGimg2 from "../../assets/screenTwoIMG.png";

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 1110px;
  height: -webkit-fill-available;
  margin: auto;
  margin-bottom: 20px;
  background: #142828;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  padding-bottom: 41px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 390px;
height: auto;
border-radius: 0px;

`};
`;
const Head = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    color: #ffffff;
    padding-top: 80px;
  }
`;
const HeadingB2 = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    line-height: 39px;
    color: #00a576;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 28px;
   `};
  }
`;
const SubWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: auto;
  height: fit-content
  margin:  auto;
  margin-top: 82px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
 display: grid;
 margin-top: 50px;


`};
`;
const BoxLeft = styled.div`
  &&& {
    display: grid;
    place-content: center;
  }
`;
const BoxRight = styled.div`
  &&& {
    margin-right: 50px;
    display: grid;
    place-content: center;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: 25px;
    margin-right: 0px;

 `};
  }
`;
const BoxRight2 = styled.div`
  &&& {
    margin-left: 111px;
    display: grid;
    place-content: center;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display:none;
 `};
  }
`;
const BoxRight2Mobile = styled.div`
  &&& {
    display: none;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    margin: 30px 15px;
    margin-left: 25px;

 `};
  }
`;
const BGS2 = styled.img`
  &&& {
    width: 490px;
    height: 490px;
    margin-right: 50px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 390px;
  height: 390px; 
  margin-right: 0px;

 `};
  }
`;
const TextB2 = styled(Typography)`
  &&& {
    margin-top: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
display:none    `};
  }
`;
const TextB2Mob = styled(Typography)`
  &&& {
    display: none;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: block;
    margin-top: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 24px;
    color: #ffffff;    `};
  }
`;
const List = styled.div`
  &&& {
    margin: 24px 0px;
    position: relative;
  }
`;
const ListText = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin: auto 20px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 12.5px;
    `};
  }
`;
const ListItem = styled.div`
  &&& {
    display: flex;
    margin: 16px 0px;
  }
`;
const Number = styled.div`
  &&& {
    background: #142828;
    display: grid;
    place-content: center;
    width: 40.27px;
    height: 40px;
    left: 750.04px;
    top: 1140px;
    border-radius: 30px;
    background: #142828;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    z-index: 1;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 14px;
    width: 32px;
    height: 32px;
    `};
  }
`;
const LineBehind = styled.div`
  &&& {
    border-left: 1px solid white;
    height: calc(100% - 32px);
    position: absolute;
    left: 20px;
    margin: 16px 0px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    left: 16px;
    `};
  }
`;
const LineBehind2 = styled.div`
  &&& {
    border-left: 1px solid white;
    height: calc(100% - 40px);
    position: absolute;
    left: 20px;
    margin: 16px 0px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    left: 16px;
    `};
  }
`;
function ScreenTwo() {
  return (
    <Wrapper>
      <Head>How It Works</Head>
      <SubWrapper>
        <BoxLeft>
          <BGS2 src={BGimg1} alt="" />
        </BoxLeft>
        <BoxRight>
          <HeadingB2>Predict the future</HeadingB2>
          <TextB2>
            Use your experience and intuition to predict the outcome <br />
            of real-world events, take a position and win rewards
          </TextB2>
          <TextB2Mob>
            Use your experience and intuition to predict the outcome of
            real-world events, take a position and win rewards
          </TextB2Mob>
          <List>
            <LineBehind />
            <ListItem>
              <Number>1</Number>
              <ListText>Choose a market</ListText>
            </ListItem>
            <ListItem>
              <Number>2</Number>
              <ListText>Select an outcome</ListText>
            </ListItem>{" "}
            <ListItem>
              <Number>3</Number>
              <ListText>Take your position on the outcome</ListText>
            </ListItem>{" "}
            <ListItem>
              <Number>4</Number>
              <ListText>Earn outstanding rewards</ListText>
            </ListItem>
          </List>
        </BoxRight>
      </SubWrapper>
      <SubWrapper>
        <BoxRight2>
          <HeadingB2>Earn while supporting your favourite teams</HeadingB2>
          <TextB2>
            Buy the NFT of the team you believe in and earn rewards for holding
            it while they win matches and tournaments
          </TextB2>
          <List>
            <LineBehind />
            <ListItem>
              <Number>1</Number>
              <ListText>Buy the NFT of the team you think will win</ListText>
            </ListItem>
            <ListItem>
              <Number>2</Number>
              <ListText>Wait for the outcome of the match/tournament</ListText>
            </ListItem>{" "}
            <ListItem>
              <Number>3</Number>
              <ListText>Get rewards every time your team wins</ListText>
            </ListItem>{" "}
          </List>
        </BoxRight2>
        <BoxLeft>
          <BGS2 src={BGimg2} alt="" />
        </BoxLeft>
        <BoxRight2Mobile>
          <HeadingB2>Earn while supporting your favourite teams</HeadingB2>
          <TextB2Mob>
            Buy the NFT of the team you believe in and earn rewards for holding
            it while they win matches and tournaments
          </TextB2Mob>
          <List>
            <LineBehind2 />
            <ListItem>
              <Number>1</Number>
              <ListText>Buy the NFT of the team you think will win</ListText>
            </ListItem>
            <ListItem>
              <Number>2</Number>
              <ListText>Wait for the outcome of the match/tournament</ListText>
            </ListItem>{" "}
            <ListItem>
              <Number>3</Number>
              <ListText>Get rewards every time your team wins</ListText>
            </ListItem>{" "}
          </List>
        </BoxRight2Mobile>
      </SubWrapper>
    </Wrapper>
  );
}

export default ScreenTwo;
