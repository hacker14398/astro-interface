import styled from "styled-components";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { QuestionData } from "../../state/questions/slice";
import { encodedID, getFlooredFixed, numeralFormatNumber } from "../../utils";
import {
  useQuestionBetDataMapping,
  useTeamLogos,
} from "../../state/questions/hooks";
import Tick from "../../assets/ellipse.png";
import getMultiplierV2 from "../../utils/getMultiplierV2";
import CancelIcon from "@mui/icons-material/Cancel";

import {
  changeDateFormat,
  epochConverter,
  getEpoch,
} from "../../utils/getEpoch";
import secondsToDHms from "../../utils/secondsToDHms";

const Wrapper = styled.div`
  &&& {
    height: 480px;
    box-shadow: 0px 0px 0px;
    background: none;
    display: flex;
  }
`;
const TickImg = styled.img`
  position: absolute;
`;
const SubWrapper1 = styled.div<{ show: boolean }>`
  &&& {
    width: 378px;
    height: 462px;
    background: linear-gradient(
      152.97deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    // backdrop-filter: blur(42px);
    border-radius: 16px;
    border: ${({ show, theme }) => (show ? `1px solid #00a576` : "none")};
    // border: 1px solid;

    // border-image-source: radial-gradient(
    //     69.43% 69.43% at 50% 50%,
    //     #ffffff 0%,
    //     rgba(255, 255, 255, 0) 100%
    //   ),
    //   radial-gradient(
    //     60% 51.57% at 50% 50%,
    //     #17b384 0%,
    //     rgba(23, 179, 132, 0) 100%
    //   ),
    //   radial-gradient(
    //     54.8% 53% at 50% 50%,
    //     #151515 0%,
    //     rgba(21, 21, 21, 0) 100%
    //   );
  }
`;

const SubWrapper2 = styled.div`
  &&& {
    margin-top: 9px;
    width: 351px;
    height: 443.96px;
    background: #000000;
    border-radius: 0px 16px 16px 0px;
  }
`;
const StyledTextVS = styled(Typography)`
  &&& {
    display: grid;
    place-content: center;
    color: #bdbdbd;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
  }
`;
const StyledLineDiv = styled.div`
  &&& {
    display: grid;
    place-items: center;
    margin-top: 10px;
  }
`;

const StyledHeading = styled(Typography)`
  &&& {
    color: white;
    margin-top: 16px;
    margin-bottom: 10px;

    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
`;

const StyledLine = styled.div`
  &&& {
    margin: auto;
    width: 319px;
    mix-blend-mode: normal;
    border: 0.3px solid #0d3b3a;
  }
`;
const StyledQuestionDiv = styled.div<{ show: boolean }>`
  &&& {
    width: auto;
    height: auto;
    // background: rgba(0, 0, 0, 0.5);
    border-radius: 16px;
    margin: 16px;
    padding-bottom: 10px;
    background-color: ${({ show }) =>
      show ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.5)"};
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    border: 1px solid #4c4b4b14;
    box-shadow: 12px 12px 25px #1a1b1c73;

    ${({ theme }) => theme.mediaWidth.upToSmall`
    &&&{
      width: 301px;
      height: auto;
    }
    `};
  }
`;
const StyledButtonDivA = styled.div`
  &&& {
    display: grid;
    place-items: center;
  }
`;
const StyledButtonDivB = styled.div`
  &&& {
    display: grid;
    place-items: center;
  }
`;

const ExpandedWrapper = styled.div`
// border: 1px solid;
border-image-source: radial-gradient(
    69.43% 69.43% at 50% 50%,
    #ffffff 0%,
    rgba(255, 255, 255, 0) 100%
  ),
  radial-gradient(
    60% 51.57% at 50% 50%,
    #17b384 0%,
    rgba(23, 179, 132, 0) 100%
  ),
  radial-gradient(
    54.8% 53% at 50% 50%,
    #151515 0%,
    rgba(21, 21, 21, 0) 100%
  );

border-radius: 16px;
margin: 0px 15px;
margin-bottom: 50px;
width: 377.86px;
height: 498px;
opacity: 1;
backdrop-filter: blur(42px);
-webkit-backdrop-filter: blur(42px);
// border: 1px;
// box-shadow: 12px 12px 25px #1a1b1c73;
position: relative;
background: linear-gradient(
  152.97deg,
  rgba(255, 255, 255, 0.2) 0%,
  rgba(255, 255, 255, 0) 100%
);
}
${({ theme }) => theme.mediaWidth.upToSmall`
&&&{
width: 350px;
margin: 10px;
margin-bottom: 25px;
position: relative;
}
`};
`;

const Cards = styled.div`
  display: flex;
  width: auto;
  height: min-content;
  margin-bottom: 40px;
  position: relative;
`;

const StyledLive = styled(WbSunnyIcon)`
  &&& {
    font-size: 12px;
    margin-top: 3px;
  }
`;
const StyledCloseButton = styled(CancelIcon)`
  &&& {
    color: #2d2f35;
    font-size: 24px;
    position: absolute;
    top: 4%;
    left: 95%;
    :hover {
      color: white;
    }
  }
`;

const StyledBottom = styled(Typography)`
  &&& {
    color: white;
    margin-top: 16px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    // position: absolute;
    // top: 90%;
    // left: 40%;
  }
`;
const StyledLiveDiv = styled.div<{ show: boolean }>`
  &&& {
    display: flex;
    margin-left: 12px;
    margin-top: 10px;
    color: red;
    opacity: ${({ show }) => (show ? 1 : 0)};
  }
`;
const StyledTimer = styled.div`
  &&& {
    // font-size: 13px;
    // background-color: #fdeaf1;
    // width: 115px;
    // height: 30px;
    // display: grid;
    // place-items: center;
    // color: #fa005d;
    // border-radius: 0px 15px 0px 15px;
    // margin-left: auto;
  }
`;
const StyledMainCircle = styled.div`
  &&& {
    display: flex;
    padding: 0px 29.6px 10px 29.6px;
    justify-content: center;
  }
`;
const StyledCircle = styled.div`
  &&& {
    background-color: #ffffff;
    width: 55px;
    height: 55px;
    display: grid;
    place-items: center;
    border-radius: 50%;
  }
`;
const StyledCircle2 = styled.div`
  &&& {
    opacity: 1;
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid #4c4b4b14;
    box-shadow: 12px 12px 25px #1a1b1c73;
    width: 45px;
    height: 45px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const StyledText = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
  }
`;
const StyledQuestion = styled(Typography)`
  &&& {
    color: white;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    padding: 16px 16px;
    min-height: 112px;
    display: grid;
    place-items: center;
  }
`;
const StyledBlueLine = styled.div`
  border-top: 2px solid;
  width: 47px;
  color: #129aee;
  margin: auto;
  margin-top: 20px;
`;

const StyledGreyLine = styled.div`
  border-top: 2px solid;
  width: 146px;
  height: 0px;
  margin: auto;
  border: 0.5px solid #b5b7bc;
  opacity: 1;
  margin-top: 2px;
`;

const StyledButton = styled(Button)`
  &&& {
    font-size: 18px;
    color: white;
    width: 95px;
    height: 45px;
    border-radius: 8px;
    text-transform: none;
    :hover {
      background-color: #fa005d;
    }
  }
`;
const StyledHomeCircle = styled.div`
  &&& {
    width: 70px;
    height: 70px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    // opacity: 1;
    // backdrop-filter: blur(30px);
    // -webkit-backdrop-filter: blur(15px);
    // border: 1px solid #4c4b4b14;
    // box-shadow: 12px 12px 25px #1a1b1c73;
    position: absolute;
    right: 45.5%;
    top: 88%;
  }
`;
const BottomDiv = styled.div`
  &&& {
    display: flex;
    justify-content: space-evenly;
  }
`;
const StyledButtonA = styled(Button)<{ show: boolean }>`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: white;
    width: -webkit-fill-available;
    height: 40px;
    border-radius: 8px;
    text-transform: none;
    background-color: ${({ show }) => (!show ? "#3674dd" : "#1d3050")};
    border: 1px solid #2d5aa8;
    :hover {
      background: #1d3050;
      border: 1px solid #2d5aa8;
    }
  }
`;
const StyledTextBB = styled(Typography)`
  &&& {
    margin-top: 7px;
    font-family: Inter;
    font-style: normal;
    font-size: 12px;
    color: white;
    ${({ theme }) => theme.mediaWidth.upToSmall`
&&&{
  font-size: 12px;
  margin-top: 7px;

}
`};
  }
`;
const StyledButtonB = styled(Button)<{ show: boolean }>`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: white;
    width: -webkit-fill-available;
    height: 40px;
    border-radius: 8px;
    text-transform: none;
    background-color: ${({ show }) => (!show ? "#3bc862" : "#1D503B")};
    border: 1px solid #3bc862;
    :hover {
      background: #1d503b;
      border: 1px solid #3bc862;
    }
  }
`;
const StyledText3 = styled(Typography)`
  &&& {
    text-align: center;
    padding: 0px 60px;
    font-size: 10px;
    color: white;
    margin-top: 16px;
    line-height: 11px;
  }
`;
const StyledTextHard = styled(Typography)`
  &&& {
    background: rgba(194, 198, 64, 0.11);
    border-radius: 8px;
    text-align: center;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;
    padding: 8px;
    color: #ffffff;

    /* Inside Auto Layout */

    flex: none;
    order: 0;
    flex-grow: 1;
    margin: 0px 10px;
    position: absolute;
    top: 82%;
  }
`;
const StyledHead = styled.p`
  color: white;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  margin-top: 0px;
  background: rgba(18, 116, 196, 0.2);
  border-radius: 5px;
  width: fit-content;
  // height: 30px;
  display: grid;
  padding: 0px 12px;
  place-items: center;
`;
const StyledText5 = styled(Typography)`
  &&& {
    margin: 16px;

    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    /* or 171% */

    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;

    color: #ffffff;

    white-space: pre-wrap; /* CSS3 */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap; /* Opera <7 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* IE */
  }
`;
const CenterBlueLine = styled.div`
  &&& {
    width: 0px;
    height: 193px;
    border: 1px solid #55b6f1;
    opacity: 1;
    margin: auto;
    position: absolute;
    top: 25%;
    left: 50%;
  }
`;
const StyledTextTimer = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 13px;
    line-height: 24px;
    align-items: center;
    color: #17b384;
  }
`;
const Box1 = styled.div`
  &&& {
    width: -webkit-fill-available;
    width: -moz-available;
  }
`;
const HeaderDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 14px 16px 20px 16px;
`;
const Box2 = styled.div`
  &&& {
    width: -webkit-fill-available;
    width: -moz-available;
  }
`;
const TeamADiv = styled.div`
  &&& {
    display: grid;
    place-items: center;
    margin-top: 16px;
  }
`;
const TeamBDiv = styled.div`
  &&& {
  }
`;
const Team1 = styled.img`
  width: 40px;
  height: 40px;
`;
const StyledBack = styled.img`
  &&& {
    width: 51.2px;
    height: 51.2px;
    background: rgba(0, 15, 130, 0.3);
    border-radius: 0px 32px 32px 0px;
  }
`;

// const Wrapper = styled.div`
//   &&& {
//     height: 480px;
//     box-shadow: 0px 0px 0px;
//     background: none;
//     display: flex;
//   }
// `;
// const ExpandedWrapper = styled.div`
//   &&& {
//     width: 378px;
//     height: 462px;
//     background: linear-gradient(
//       152.97deg,
//       rgba(255, 255, 255, 0.2) 0%,
//       rgba(255, 255, 255, 0) 100%
//     );
//     // backdrop-filter: blur(42px);
//     border-radius: 16px;
//     // border: 1px solid;

//     // border-image-source: radial-gradient(
//     //     69.43% 69.43% at 50% 50%,
//     //     #ffffff 0%,
//     //     rgba(255, 255, 255, 0) 100%
//     //   ),
//     //   radial-gradient(
//     //     60% 51.57% at 50% 50%,
//     //     #17b384 0%,
//     //     rgba(23, 179, 132, 0) 100%
//     //   ),
//     //   radial-gradient(
//     //     54.8% 53% at 50% 50%,
//     //     #151515 0%,
//     //     rgba(21, 21, 21, 0) 100%
//     //   );
//   }
// `;

// const Cards = styled.div`
//   display: flex;
//   width: auto;
//   height: min-content;
//   margin-bottom: 40px;
//   position: relative;
// `;

// const StyledLive = styled(WbSunnyIcon)`
//   &&& {
//     font-size: 12px;
//     margin-top: 3px;
//   }
// `;
// const StyledCloseButton = styled(CancelIcon)`
//   &&& {
//     color: white;
//     font-size: 35px;
//     :hover {
//       color: #fa005d;
//     }
//   }
// `;

// const StyledBottom = styled(Typography)`
//   &&& {
//     color: white;
//     font-weight: bold;
//     font-size: 14px;
//     text-align: center;
//     position: absolute;
//     top: 86.3%;
//     left: 45.5%;
//   }
// `;
// const StyledLiveDiv = styled.div<{ show: boolean }>`
//   &&& {
//     display: flex;
//     margin-left: 12px;
//     margin-top: 10px;
//     color: red;
//     opacity: ${({ show }) => (show ? 1 : 0)};
//   }
// `;
// const StyledTimer = styled.div`
//   &&& {
//     font-size: 13px;
//     background-color: #fdeaf1;
//     width: 115px;
//     height: 30px;
//     display: grid;
//     place-items: center;
//     color: #fa005d;
//     border-radius: 0px 15px 0px 15px;
//     margin-left: auto;
//   }
// `;
// const StyledMainCircle = styled.div`
//   &&& {
//     display: flex;
//     justify-content: space-evenly;
//     margin-top: 10px;
//   }
// `;
// const StyledCircle = styled.div`
//   &&& {
//     background-color: #ffffff;
//     width: 75px;
//     height: 75px;
//     display: grid;
//     place-items: center;
//     border-radius: 50%;
//     overflow: hidden;
//   }
// `;
// const StyledCircle2 = styled.div`
//   &&& {
//     opacity: 1;
//     backdrop-filter: blur(30px);
//     -webkit-backdrop-filter: blur(15px);
//     border: 1px solid #4c4b4b14;
//     box-shadow: 12px 12px 25px #1a1b1c73;
//     width: 45px;
//     height: 45px;
//     display: grid;
//     place-items: center;
//     border-radius: 50%;
//     cursor: pointer;
//     overflow: hidden;
//   }
// `;
// const StyledText = styled(Typography)`
//   &&& {
//     font-weight: light;
//   }
// `;
// const StyledQuestion = styled(Typography)`
//   &&& {
//     font-weight: bold;
//     font-size: 18px;
//     text-align: center;
//     padding: 0px 20px;
//     line-height: inherit;
//     min-height: 90px;
//     display: grid;
//     place-items: center;
//     // margin-top: 20px;
//   }
// `;
// const StyledBlueLine = styled.div`
//   border-top: 2px solid;
//   width: 47px;
//   color: #129aee;
//   margin: auto;
//   margin-top: 20px;
// `;

// const StyledGreyLine = styled.div`
//   border-top: 2px solid;
//   width: 146px;
//   height: 0px;
//   margin: auto;
//   border: 0.5px solid #b5b7bc;
//   opacity: 1;
//   margin-top: 2px;
// `;

// const StyledButton = styled(Button)`
//   &&& {
//     font-size: 18px;
//     color: white;
//     width: 95px;
//     height: 45px;
//     border-radius: 8px;
//     text-transform: none;
//     :hover {
//       background-color: #fa005d;
//     }
//   }
// `;
// const StyledHomeCircle = styled.div`
//   &&& {
//     width: 70px;
//     height: 70px;
//     display: grid;
//     place-items: center;
//     border-radius: 50%;
//     // opacity: 1;
//     // backdrop-filter: blur(30px);
//     // -webkit-backdrop-filter: blur(15px);
//     // border: 1px solid #4c4b4b14;
//     // box-shadow: 12px 12px 25px #1a1b1c73;
//     position: absolute;
//     right: 45.5%;
//     top: 88%;
//   }
// `;
// const BottonDiv = styled.div`
//   &&& {
//     display: flex;
//     justify-content: space-evenly;
//   }
// `;
// const StyledButtonA = styled.div`
//   &&& {
//     display: grid;
//     place-items: center;
//   }
// `;
// const StyledButtonB = styled.div`
//   &&& {
//     display: grid;
//     place-items: center;
//   }
// `;
// const StyledText3 = styled(Typography)`
//   &&& {
//     text-align: center;
//     padding: 0px 60px;
//     font-size: 10px;
//     color: white;
//     margin-top: 16px;
//     line-height: 11px;
//   }
// `;
// const StyledTextHard = styled(Typography)`
//   &&& {
//     text-align: center;
//     padding: 0px 50px;
//     font-size: 10px;
//     color: white;
//     line-height: 11px;
//     position: absolute;
//     top: 93%;
//   }
// `;
// const StyledText5 = styled(Typography)`
//   &&& {
//     text-align: center;
//     font-size: 16px;
//     padding: 0px 50px;
//     margin-top: 5px;
//     width: 400px;
//     font-weight: 300;

//     white-space: pre-wrap; /* CSS3 */
//     white-space: -moz-pre-wrap; /* Firefox */
//     white-space: -pre-wrap; /* Opera <7 */
//     white-space: -o-pre-wrap; /* Opera 7 */
//     word-wrap: break-word; /* IE */
//   }
// `;
// const CenterBlueLine = styled.div`
//   &&& {
//     width: 0px;
//     height: 193px;
//     border: 1px solid #55b6f1;
//     opacity: 1;
//     margin: auto;
//     position: absolute;
//     top: 25%;
//     left: 50%;
//   }
// `;
// const Box1 = styled.div`
//   &&& {
//     width: -webkit-fill-available;
//     width: -moz-available;
//   }
// `;
// const HeaderDiv = styled.div`
//   position: absolute;
//   display: flex;
//   width: 100%;
//   justify-content: space-between;
// `;
// const Box2 = styled.div`
//   &&& {
//     width: -webkit-fill-available;
//     width: -moz-available;
//   }
// `;
// const TeamADiv = styled.div`
//   &&& {
//     display: grid;
//     place-items: center;
//   }
// `;
// const TeamBDiv = styled.div`
//   &&& {
//   }
// `;
// const Team1 = styled.img`
//   width: 60px;
// `;

interface Props {
  question: QuestionData;
  action: (option: number) => void;
  close: () => void;
  betTaken: boolean;
  userBetAmount: string;
  userBetPosition: string;
}

function CryptoModal({
  question,
  action,
  close,
  betTaken,
  userBetAmount,
  userBetPosition,
}: Props) {
  const [questionBetDataMapping] = useQuestionBetDataMapping();
  const timeStamp = epochConverter(new Date().toUTCString());
  const [teamLogos] = useTeamLogos();
  return (
    <Wrapper>
      <SubWrapper1 show={betTaken}>
        <HeaderDiv>
          {betTaken && <TickImg src={Tick} alt="img" />}

          <StyledHead>{question.tournament}</StyledHead>

          <StyledTimer>
            <StyledTextTimer>
              {timeStamp < getEpoch(question.bid_start_time) ? (
                <span style={{ color: "#FF4C29" }}>
                  Starts in{" "}
                  {secondsToDHms(getEpoch(question.bid_start_time) - timeStamp)}
                </span>
              ) : betTaken ? (
                <span style={{ color: "#39aa2b" }}>Bid Placed</span>
              ) : timeStamp > getEpoch(question.bid_start_time) &&
                timeStamp < getEpoch(question.bid_end_time) ? (
                <span style={{ color: "#39aa2b" }}>
                  Ends in{" "}
                  {secondsToDHms(getEpoch(question.bid_end_time) - timeStamp)}
                </span>
              ) : (
                <span style={{ color: "#FF2442" }}>Ended</span>
              )}
            </StyledTextTimer>
          </StyledTimer>
        </HeaderDiv>

        <StyledMainCircle>
          <TeamADiv>
            <StyledCircle>
              <Team1
                src={teamLogos && teamLogos[question.team_a_code.toUpperCase()]}
              />
            </StyledCircle>
          </TeamADiv>
          <StyledText
            fontSize="14px"
            textAlign="center"
            color="White"
            marginTop="30px"
            fontWeight="600"
            marginLeft="10px"
          >
            {question.team_a_code}
          </StyledText>
          {/* <StyledText
            fontSize="14px"
            textAlign="center"
            marginTop="45px"
            color="#B5B7BC"
          >
            vs
          </StyledText>
          <TeamBDiv>
            <StyledCircle>
              <Team1 src={teamLogos[question.team_b_code]} />
            </StyledCircle>
            <StyledText
              fontSize="16px"
              textAlign="center"
              color="White"
              marginTop="5px"
              fontWeight="300"
            >
              {question.team_b_code}
            </StyledText>
          </TeamBDiv> */}
        </StyledMainCircle>

        {/* <StyledText
          fontSize="14px"
          textAlign="center"
          marginTop="10px"
          color="#FFA958"
          fontWeight="550"
        >
          Match Date :{" "}
          {new Date(changeDateFormat(question.bid_end_time)).toLocaleString()}
        </StyledText> */}
        <StyledLineDiv></StyledLineDiv>
        <StyledQuestionDiv show={betTaken}>
          <StyledQuestion>{question.question}</StyledQuestion>
          <BottomDiv>
            <StyledButtonDivA>
              <StyledButtonA
                show={betTaken && userBetPosition === "A"}
                disabled={betTaken}
                variant="contained"
                onClick={() => action(0)}
              >
                {question.options[0]}&nbsp;
                {betTaken && userBetPosition === "A"
                  ? `(${getFlooredFixed(userBetAmount, 1)}$)`
                  : null}
              </StyledButtonA>
              <StyledTextBB>
                {getMultiplierV2(
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.totalAmount
                    : "0",
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.ABetAmount
                    : "0"
                ).toString()}
                x Current Payout
              </StyledTextBB>
            </StyledButtonDivA>
            <StyledButtonDivB>
              <StyledButtonB
                show={betTaken && userBetPosition === "B"}
                disabled={betTaken}
                variant="contained"
                onClick={() => action(1)}
              >
                {question.options[1]}&nbsp;
                {betTaken && userBetPosition === "B"
                  ? `(${getFlooredFixed(userBetAmount, 1)}$)`
                  : null}
              </StyledButtonB>
              <StyledTextBB>
                {" "}
                {getMultiplierV2(
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.totalAmount
                    : "0",
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.BBetAmount
                    : "0"
                ).toString()}
                x Current Payout
              </StyledTextBB>
            </StyledButtonDivB>
          </BottomDiv>
        </StyledQuestionDiv>

        <StyledBottom>
          {numeralFormatNumber(
            questionBetDataMapping
              ? questionBetDataMapping[encodedID(question.question_id)]
                  ?.totalAmount
              : "0"
          )}
          $ Locked
        </StyledBottom>
      </SubWrapper1>

      <SubWrapper2>
        <StyledHeading>Stats </StyledHeading>
        <StyledLine />
        <StyledText5>
          {question.stats.split("\n").map((line) => (
            <>
              {line}
              <br />
            </>
          ))}
        </StyledText5>
        {/* <StyledTextHard>
          **Stats provided for matches played before current T20 WC 2021
        </StyledTextHard> */}
        {/* <StyledCircle2> */}
        <StyledCloseButton onClick={close} />
        {/* </StyledCircle2> */}
      </SubWrapper2>
      {/* <Cards>
          <Box1> */}
      {/* <StyledMainCircle>
              <StyledCircle>
                <StyledText
                  fontSize="21px"
                  textAlign="center"
                  color="GrayText"
                  marginTop="115px"
                >
                  {question.team_a_code}
                </StyledText>
              </StyledCircle>
              <StyledText
                fontSize="14px"
                textAlign="center"
                marginTop="45px"
                color="#B5B7BC"
              >
                vs
              </StyledText>
              <StyledCircle>
                <StyledText
                  fontSize="21px"
                  textAlign="center"
                  color="GrayText"
                  marginTop="115px"
                >
                  {question.team_b_code}
                  ENG
                </StyledText>
              </StyledCircle>
            </StyledMainCircle> */}
      {/* <StyledMainCircle>
              <TeamADiv>
                <StyledCircle>
                  <Team1
                    src={
                      teamLogos && teamLogos[question.team_a_code.toUpperCase()]
                    }
                  />
                </StyledCircle>
                <StyledText
                  fontSize="16px"
                  textAlign="center"
                  color="White"
                  marginTop="5px"
                  fontWeight="300"
                >
                  {question.team_a}
                </StyledText>
              </TeamADiv> */}
      {/* <StyledText
                fontSize="14px"
                textAlign="center"
                marginTop="45px"
                color="#B5B7BC"
              >
                vs
              </StyledText>
              <TeamBDiv>
                <StyledCircle>
                  <Team1 src={teamLogos[question.team_b_code]} />
                </StyledCircle>
                <StyledText
                  fontSize="16px"
                  textAlign="center"
                  color="White"
                  marginTop="5px"
                  fontWeight="300"
                >
                  {question.team_b_code}
                </StyledText>
              </TeamBDiv> */}
      {/* </StyledMainCircle> */}
      {/* <StyledText
                fontSize="13px"
                textAlign="center"
                marginTop="10px"
                color="#B5B7BC"
            >
              Match Timings :{" "}
              {new Date(
                changeDateFormat(question.bid_end_time)
              ).toLocaleString()}
            </StyledText> */}
      {/* <StyledBlueLine />
            <StyledQuestion>{question.question}</StyledQuestion>{" "} */}
      {/* <StyledStack direction="row" spacing={4}>
              <StyledButton variant="contained" onClick={() => action(0)}>
                {question.options[0]}
              </StyledButton>
              <StyledButton variant="contained" onClick={() => action(1)}>
                {question.options[1]}
              </StyledButton>
            </StyledStack>
            <StyledStack direction="row" spacing={4}>
              <StyledText>
                {getMultiplierV2(
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.totalAmount
                    : "0",
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.ABetAmount
                    : "0"
                ).toString()}
                x Current Payout
              </StyledText>
              <StyledText>
                {getMultiplierV2(
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.totalAmount
                    : "0",
                  questionBetDataMapping
                    ? questionBetDataMapping[encodedID(question.question_id)]
                        ?.BBetAmount
                    : "0"
                ).toString()}
                x Current Payout
              </StyledText>
            </StyledStack> */}
      {/* <BottonDiv>
              <StyledButtonA>
                <StyledButton variant="contained" onClick={() => action(0)}>
                  {question.options[0]}
                </StyledButton>
                <StyledText fontSize="13px" color="white" marginTop={`2px`}>
                  {getMultiplierV2(
                    questionBetDataMapping
                      ? questionBetDataMapping[encodedID(question.question_id)]
                          ?.totalAmount
                      : "0",
                    questionBetDataMapping
                      ? questionBetDataMapping[encodedID(question.question_id)]
                          ?.ABetAmount
                      : "0"
                  ).toString()}
                  x Current Payout
                </StyledText>
              </StyledButtonA>
              <StyledButtonB>
                <StyledButton variant="contained" onClick={() => action(1)}>
                  {question.options[1]}
                </StyledButton>
                <StyledText fontSize="14px" color="white" marginTop={`2px`}>
                  {" "}
                  {getMultiplierV2(
                    questionBetDataMapping
                      ? questionBetDataMapping[encodedID(question.question_id)]
                          ?.totalAmount
                      : "0",
                    questionBetDataMapping
                      ? questionBetDataMapping[encodedID(question.question_id)]
                          ?.BBetAmount
                      : "0"
                  ).toString()}
                  x Current Payout
                </StyledText>
              </StyledButtonB>
            </BottonDiv> */}
      {/* <StyledText3>
              The earning factor chosen for calculation will be factor at the
              time of ending of bids
            </StyledText3> */}
      {/* </Box1>
          <Box2> */}
      {/* <StyledText4>
              <Typography fontWeight="bold" fontSize="18px">
                Winning History
              </Typography>
            </StyledText4>
            <StyledGraph /> */}
      {/* <StyledText
              fontSize="16px"
              textAlign="center"
              marginTop="20px"
              fontWeight={`600`}
            >
              Stats
            </StyledText>
            <StyledGreyLine />

            <StyledText5>
              {question.stats.split("\n").map((line) => (
                <>
                  {line}
                  <br />
                </>
              ))}
            </StyledText5> */}
      {/* </Box2>
        </Cards> */}
      {/* <CenterBlueLine /> */}
      {/* <StyledBottom>
        {numeralFormatNumber(
          questionBetDataMapping
            ? questionBetDataMapping[encodedID(question.question_id)]
                ?.totalAmount
            : "0"
        )}
        $ Locked
      </StyledBottom> */}

      {/* <StyledHomeCircle>
        <StyledCircle2> */}
      {/* <StyledExpandIcon /> */}
      {/* <StyledCloseButton onClick={close} />
        </StyledCircle2>
      </StyledHomeCircle> */}
    </Wrapper>
  );
}

export default CryptoModal;
