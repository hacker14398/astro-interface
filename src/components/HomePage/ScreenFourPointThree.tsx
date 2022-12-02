import { Typography } from "@mui/material";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../lotties/holding-money.json";
const Wrapper = styled.div``;
const SlideOne = styled.div`
  background: #af2eff;
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
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
  }
`;
const Center = styled.div`
  display: flex;
  gap: 168px;
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
  }
`;
const LotteStyle = styled.div`
  &&& {
    margin: auto;
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
function ScreenFourPointThree() {
  return (
    <Wrapper>
      <SlideOne>
        <Center>
          <LotteStyle>
            <Lottie options={defaultOptions} height={198} width={198} />
          </LotteStyle>
          <Content>
            <Text> YODA ADVANTAGES </Text>
            Lower commission <br /> compared to <br />
            traditional prediction <br />
            markets
          </Content>
        </Center>
      </SlideOne>
    </Wrapper>
  );
}

export default ScreenFourPointThree;
