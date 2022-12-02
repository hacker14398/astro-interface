import { Typography } from "@mui/material";
import styled from "styled-components";
import Lottie from "react-lottie";
import animationData from "../../lotties/fox-animation.json";
const Wrapper = styled.div``;
const SlideOne = styled.div`
  background: #00a576;
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
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
function ScreenFourPointTwo() {
  return (
    <Wrapper>
      <SlideOne>
        <Center>
          <Lottie options={defaultOptions} height={400} width={400} />
          <Content>
            <Text> YODA ADVANTAGES </Text>
            Predict by just <br /> connecting to <br />
            Metamask
          </Content>
        </Center>
      </SlideOne>
    </Wrapper>
  );
}

export default ScreenFourPointTwo;
