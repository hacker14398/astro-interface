import { Typography } from "@mui/material";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../lotties/identity.json";
const Wrapper = styled.div``;

const SlideOne = styled.div`
  background: #1faeff;
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  width: 342px;
  height: 596px;
  margin: auto;
`};
  }
`;

const Content = styled(Typography)`
  &&& {
    display: grid;
    place-content: center;
    grid-gap: 26px;
    column-gap: 168px;
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    text-align: center;
    
    color: #FFFFFF;
    
    
`};
  }
`;
const Center = styled.div`
  &&& {
    display: flex;
    gap: 168px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: auto;
  display: grid;
  grid-gap: 0px;
`};
  }
`;
const Text = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    /* or 130% */
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 26px;
    /* or 162% */
    
    text-align: center;
    
    color: #FFFFFF;
  `};
  }
`;
const StyledLottie = styled(Lottie)`
  &&& {
  }
`;
const StyledText = styled.div`
  &&& {
    display: grid;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 70px 0px;

  `};
  }
`;
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function ScreenFourPointOne() {
  return (
    <Wrapper>
      <SlideOne>
        <Center>
          <StyledLottie options={defaultOptions} width={400} height={400} />
          <StyledText>
            <Content>
              <Text> YODA ADVANTAGES </Text>
              No KYC Required
            </Content>
          </StyledText>
        </Center>
      </SlideOne>
    </Wrapper>
  );
}

export default ScreenFourPointOne;
