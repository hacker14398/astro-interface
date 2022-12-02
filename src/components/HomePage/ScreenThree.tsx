import { Stack, Typography } from "@mui/material";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { QuestionData } from "../../state/questions/slice";
import { useHistory } from "react-router-dom";
import {
  useQuestionBetDataMapping,
  useTeamLogos,
} from "../../state/questions/hooks";
import { encodedID, getFlooredFixed } from "../../utils";

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  padding: 0px 125px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  padding: 0px;
`};
`;
const SubWrapper = styled.div`
  &&& {
    display: flex;
    gap: 40px;
    justify-content: space-evenly;
    width: auto;
    height: fit-content;
    margin: auto;
    margin-bottom: 150px;
    padding: 80px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    grid-gap: 40px;
    padding: 40px ;
    margin-bottom: 40px;

    `};
  }
`;

const BoxRight = styled.div`
  display: grid;
  place-content: center;
`;
const SubBox = styled.div`
  // display: grid;
  // place-content: center;
  width: 458px;
  height: 300px;
  background: #0e3234;
  backdrop-filter: blur(42px);
  border-radius: 4px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 324.82px;
height: 300px;
  `};
`;
const HeadSubBox = styled.div`
  width: auto;
  height: 80px;
  background: #0f373c;
  backdrop-filter: blur(42px);
  // position: fixed;
  border-radius: 4px 4px 0px 0px;
`;
const Elements = styled.div`
  display: flex;
  padding: 25px;
`;
const Circle = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 30px;
  background: #c4c4c4;
`;
const Placeholder = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 30px;
  background: #c4c4c4;
`;
const Content = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  /* or 200% */
  margin: 0 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  text-transform: uppercase;

  color: #689ea5;
`;
// const Image = styled.img`
//   width: 35px;
//   height: 35px;
// `;
const CatTag = styled.div`
  position: relative;
  left: 350px;
  bottom: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  width: 100.29px;
  height: 24px;
  background: #af2eff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  left: 225px;
  width: 92.75px;
  height: 21.77px;
}
  `};
`;
const CatText = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 24px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #ffffff;
  }
`;
const StyledQuestion = styled(Typography)`
  &&& {
    min-height: 75px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 26px;
    margin: 24px 32px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 16px;
    line-height: 26px;

  `};
  }
`;
const StyledStack = styled(Stack)`
  display: flex;
  justify-content: center;
`;
const StyledButton = styled(Button)`
  &&& {
    width: 200px;
    height: 40px;
    border: 1px solid #3bc862;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #3bc862;
    :hover {
      background: #1d503b;
      border: 1px solid #3bc862;
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 133.56px;
  height: 48px;

`};
  }
`;
const StyledButtonY = styled(Button)`
  &&& {
    width: 200px;
    height: 40px;
    border: 1px solid #3674dd;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.01em;
    color: #3674dd;
    :hover {
      background: #1d3050;
      border: 1px solid #3674dd;
    }
    ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 133.56px;
    height: 48px;

  `};
  }
`;
const Value = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 24px;
    display: flex;
    align-items: center;
    letter-spacing: 0.01em;
    color: #689ea5;
    margin: 14px 22px;
  }
`;
const SubHeading = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 30px;
    line-height: 48px;
    text-align: center;
    margin-top: 25px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-size: 22px;
    line-height: 28px;
    padding: 0px 20px;
    margin-top: 20px;

  `};
  }
`;
const Heading = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin-top: 160px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 80px;
    font-size: 32px;

  `};
  }
`;
function ScreenThree({
  second,
  third,
}: {
  second: QuestionData;
  third: QuestionData;
}) {
  const history = useHistory();
  const [teamLogos] = useTeamLogos();
  const [questionBetDataMapping] = useQuestionBetDataMapping();
  const handleClick = (question: QuestionData) => {
    const slash =
      history.location.pathname[history.location.pathname.length - 1] === "/"
        ? ""
        : "/";
    if (question)
      history.push(
        "prediction-markets" +
          slash +
          question?.category.toLowerCase() +
          slash +
          question.question_id.toLowerCase()
      );
  };
  return third && second ? (
    <Wrapper>
      <Heading>Play Now</Heading>
      <SubHeading>Choose a market and earn rewards while playing </SubHeading>

      <SubWrapper>
        {second && (
          <BoxRight>
            <SubBox>
              <HeadSubBox>
                <Elements>
                  {!second ? (
                    <Placeholder />
                  ) : (
                    <>
                      {second?.team_b === "" ? (
                        <>
                          <Circle
                            src={
                              teamLogos &&
                              second &&
                              teamLogos[second.team_a_code.toUpperCase()]
                            }
                          />
                          <Content>
                            {second?.team_a_code} <br />
                            {/* Match Date: 15 Oct 2021, 16:00 IST */}
                          </Content>
                        </>
                      ) : (
                        <>
                          <Content>
                            {second?.team_a_code} <br />
                            {/* Match Date: 15 Oct 2021, 16:00 IST */}
                          </Content>
                          <Circle
                            src={
                              teamLogos &&
                              second &&
                              teamLogos[second.team_a_code.toUpperCase()]
                            }
                          />
                          <Content style={{ fontSize: "10px" }}>
                            vs <br />
                          </Content>
                          <Circle
                            src={
                              teamLogos &&
                              second &&
                              teamLogos[second.team_b_code.toUpperCase()]
                            }
                          />
                          <Content>
                            {second?.team_b_code} <br />
                          </Content>
                        </>
                      )}
                    </>
                  )}
                </Elements>
                <CatTag>
                  <CatText>{second?.category}</CatText>
                </CatTag>
              </HeadSubBox>
              <StyledQuestion>{second?.question}</StyledQuestion>
              <StyledStack spacing={2} direction="row">
                <StyledButtonY onClick={() => handleClick(second)}>
                  {second?.options[0]}
                </StyledButtonY>
                <StyledButton onClick={() => handleClick(second)}>
                  {second?.options[1]}
                </StyledButton>
              </StyledStack>
              <Value>
                Value Locked: $
                {second
                  ? getFlooredFixed(
                      questionBetDataMapping
                        ? questionBetDataMapping[encodedID(second.question_id)]
                            ?.totalAmount
                        : "0",
                      1
                    )
                  : ""}
              </Value>
            </SubBox>
          </BoxRight>
        )}
        {third && (
          <BoxRight>
            <SubBox>
              <HeadSubBox>
                <Elements>
                  {!third ? (
                    <Placeholder />
                  ) : (
                    <>
                      {third?.team_b === "" ? (
                        <>
                          <Circle
                            src={
                              teamLogos &&
                              third &&
                              teamLogos[third.team_a_code.toUpperCase()]
                            }
                          />
                          <Content>
                            {third?.team_a_code} <br />
                            {/* Match Date: 15 Oct 2021, 16:00 IST */}
                          </Content>
                        </>
                      ) : (
                        <>
                          <Content>
                            {third?.team_a_code} <br />
                            {/* Match Date: 15 Oct 2021, 16:00 IST */}
                          </Content>
                          <Circle
                            src={
                              teamLogos &&
                              third &&
                              teamLogos[third.team_a_code.toUpperCase()]
                            }
                          />
                          <Content style={{ fontSize: "10px" }}>
                            vs <br />
                          </Content>
                          <Circle
                            src={
                              teamLogos &&
                              third &&
                              teamLogos[third.team_b_code.toUpperCase()]
                            }
                          />
                          <Content>
                            {third?.team_b_code} <br />
                          </Content>
                        </>
                      )}
                    </>
                  )}
                </Elements>
                <CatTag>
                  <CatText>{third?.category}</CatText>
                </CatTag>
              </HeadSubBox>
              <StyledQuestion>{third?.question}</StyledQuestion>
              <StyledStack spacing={2} direction="row">
                <StyledButtonY onClick={() => handleClick(third)}>
                  {third?.options[0]}
                </StyledButtonY>
                <StyledButton onClick={() => handleClick(third)}>
                  {third?.options[1]}
                </StyledButton>
              </StyledStack>
              <Value>
                Value Locked: $
                {third
                  ? getFlooredFixed(
                      questionBetDataMapping
                        ? questionBetDataMapping[encodedID(third.question_id)]
                            ?.totalAmount
                        : "0",
                      1
                    )
                  : ""}
              </Value>
            </SubBox>
          </BoxRight>
        )}
      </SubWrapper>
    </Wrapper>
  ) : (
    <></>
  );
}

export default ScreenThree;
