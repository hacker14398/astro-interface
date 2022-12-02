import { useEffect, useState } from "react";
import QuestionCard from "../../components/Cards/QuestionCard";
import Buttons from "../../components/Buttons";
import styled from "styled-components";
import newMarkets from "../../assets/new-markets.png";
import {
  useMatchData,
  useQuestionAddresses,
  useUserBetsMapping,
} from "../../state/questions/hooks";
import {  getEpoch } from "../../utils/getEpoch";
import { encodedID } from "../../utils";
import { useParams } from "react-router";
import CryptoCard from "../../components/Cards/CryptoCard";
import BannerInternal from '../../components/Banner'

const Wrapper = styled.div``;
const StyledFlexBox = styled.div`
  &&& {
    width: 90%;
    margin: auto;
  }
`;
const StyledFlexChild = styled.div`
  &&& {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const BannerWrapper = styled.div`
    display: grid;
    place-items: center;
    height: 75vh;
`
const Banner = styled.img`
    max-width: 800px;
    width: 100%;
    border-radius: 20px;
`

const Home = () => {

  const [matchData] = useMatchData();
  const [questionAddresses] = useQuestionAddresses();

  const [userBetMapping] = useUserBetsMapping();

  const [timeStamp,setTimeStamp] = useState(Math.round(Date.now() / 1000));

  const {questionId} = useParams<{questionId: string}>()

  useEffect(() => {
    const updateTimeStampInterval = setInterval(() => {
      setTimeStamp(Math.round(Date.now() / 1000));
    }, 60000);
    return () => clearInterval(updateTimeStampInterval);
  }, []);

  useEffect(() => {
    
  }, [userBetMapping]);

  return (
    <Wrapper>
      <Buttons />
      {/* <SegmentControl /> */}
      <StyledFlexBox>
        <StyledFlexChild>
          {
          matchData?.length === 0?
          <BannerWrapper>
            <BannerInternal />
            {/* <Banner src={newMarkets}/> */}
          </BannerWrapper>
            :
          matchData?.map((match) => {
            if (
              getEpoch(match.question_show_end_time) < timeStamp ||
              getEpoch(match.question_show_start_time) > timeStamp
            )
            return <></>;
            return (
              questionAddresses &&
              match?.questions?.map((question) => (
                question.team_b!==""?
                <QuestionCard
                  key={question.question_id}
                  question={question}
                  addresses={questionAddresses}
                  betTaken = {userBetMapping?userBetMapping[encodedID(question.question_id)]?true:false:false}
                  userBetAmount = {userBetMapping?userBetMapping[encodedID(question.question_id)]?userBetMapping[encodedID(question.question_id)].amount:"0":"0"}
                  userBetPosition = {userBetMapping?userBetMapping[encodedID(question.question_id)]?userBetMapping[encodedID(question.question_id)].position:"0":"0"}
                  openQuestionModal = {questionId?.toLowerCase() === question.question_id.toLowerCase()}
                />:<CryptoCard
                key={question.question_id}
                question={question}
                addresses={questionAddresses}
                betTaken = {userBetMapping?userBetMapping[encodedID(question.question_id)]?true:false:false}
                userBetAmount = {userBetMapping?userBetMapping[encodedID(question.question_id)]?userBetMapping[encodedID(question.question_id)].amount:"0":"0"}
                userBetPosition = {userBetMapping?userBetMapping[encodedID(question.question_id)]?userBetMapping[encodedID(question.question_id)].position:"0":"0"}
                openQuestionModal = {questionId?.toLowerCase() === question.question_id.toLowerCase()}
              />
              ))
            );
          })}
        </StyledFlexChild>
      </StyledFlexBox>
    </Wrapper>
  );
};

export default Home;
