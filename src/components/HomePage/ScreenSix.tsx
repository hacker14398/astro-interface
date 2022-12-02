import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import Product from "../../assets/yoda2.svg";
import Master from "../../assets/yoda3.svg";
import Tech from "../../assets/yoda1.svg";
import NewWeb from "../../assets/web3.png";

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
`;
const SubWrapper = styled.div`
  &&& {
    // display: flex;
    width: 100%;
    height: auto;
  }
`;
const Head = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 800;
    font-size: 40px;
    line-height: 48px;
    text-align: center;
    margin: auto;
    margin-top: 140px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top: 80px;

     `};
  }
`;
const FlexBox = styled.div`
  &&& {
    height: auto;
    display: flex;
    justify-content: space-evenly;
    margin-top: 100px;
    padding=bottom: 140px;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    grid-gap: 40px;
     `};
  }
`;
const Box = styled.div`
  &&& {
    display: grid;
    place-items: center;
    margin-bottom: 40px;
  }
`;
const YodaImg = styled.img`
  &&& {
    width: 80px;
    height: 80px;
  }
`;
const Title = styled(Typography)`
  &&& {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    margin-top: 25px;
    color: #ffffff;
  }
`;
const Text = styled(Typography)`
  &&& {
    max-height: 160px;
    font-family: Inter;
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 26px;
    letter-spacing: 0px;
    /* or 186% */
    max-width: 255px;
    text-align: justify;
    margin-top: 20px;
    color: #ffffff;
    ${({ theme }) => theme.mediaWidth.upToSmall`

     `};
  }
`;
const NewToWeb3 = styled.div`
  &&& {
    display: none;
    ${({ theme }) => theme.mediaWidth.upToSmall`
    display: grid;
    place-content: center;
    margin: auto;
    width: 342px;
    height: auto;
    margin-top: 50px;
    background: #00a576;
    border-radius: 8px;
     `};
  }
`;
const ContextText = styled.div`
  display: grid;
  text-align: center;
  margin: 0px 15px;
`;
const Web3 = styled.img`
  &&& {
    margin: 15px;

    width: 310px;
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
const StyledButton = styled(Button)`
  &&& {
    width: 118.9px;
    height: 38px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 19px;
    color: white;
    margin: auto;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

function ScreenFive() {
  return (
    <Wrapper>
      <SubWrapper>
        <Head>Team</Head>
        <FlexBox>
          <Box>
            <YodaImg src={Product} />
            <Title>Product Yoda</Title>
            <Text>
              Product Yoda is responsible for the whole product development
              lifecycle. Looking at creative and innovative ways to make the
              product exciting and seamless for the users to use. With an
              experience of more than 5 years in creating world class products.
            </Text>
          </Box>
          <Box>
            <YodaImg src={Master} />
            <Title>Yoda Master</Title>
            <Text>
              This is leading our marketing efforts ranging from PR to making
              our presence felt in all channels. Whether it is creating memes,
              innovative ideas or managing the community, this Yoda comes in
              handy
            </Text>
          </Box>
          <Box>
            <YodaImg src={Tech} />
            <Title>Yoda Tech Counsel </Title>
            <Text>
              A team of experienced developers (4 developers) who have been
              working in the blockchain space for over 2 years now. They are
              dedicated to creating easy-to-use and highly secure and scalable
              products.
            </Text>
          </Box>
        </FlexBox>
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
            <StyledButton> Read More</StyledButton>
          </ContextText>
        </NewToWeb3>
      </SubWrapper>
    </Wrapper>
  );
}

export default ScreenFive;
