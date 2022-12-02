import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import styled from "styled-components";
const Wrapper = styled.div`
  width: 38rem;
  color: ${({ theme }) => theme.text1};
  opacity: 1;
  border-radius: 15px;
  backdrop-filter: opacity(0.3);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  background: #ffffff15;
  grid-template-rows: auto auto;
  padding: 20px;
  padding-top: 0;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 25rem;
		width: 80vw;
	    height: 90vh;
        display: flex;
        flex-direction: column;
  	`};
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
const Title = styled.div`
  font-size: 20px;
  grid-column: span 2;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;
const ListItem = styled.li`
  margin-top: 4px;
  margin-left: 10px;
`;
const BlueUnderline = styled.a`
  color: ${({ theme }) => theme.lightBlue1};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.lightBlue1};
  word-wrap: nowrap;
  cursor: pointer;
`;
export const Text = styled.p<{
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
    if (color === "primary") return theme.primary1;
    return theme.white1;
  }};
`;
interface HowItWorksModalProps {
  close: () => void;
}
const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ close }) => {
  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <Title>
        <Text
          fontSize={"19px"}
          textAlign={"center"}
          color={"primary"}
          fontWeight={"bold"}
        >
          How It Works
        </Text>
      </Title>
      <ol>
        <ListItem>
          Buy NFT of the team you believe will win the world cup; NFTs can be
          bought only till the specified time
        </ListItem>
        <ListItem>
          The amount collected from NFT sale will be kept in a reward pool
        </ListItem>
        <ListItem>
          Post the world cup finishes the amount will be distributed to the NFT
          holders -
          <ol type="a">
            <ListItem>
              <Text fontSize={"17px"} color={"primary"} fontWeight={"bold"}>
                Winners -
              </Text>{" "}
              60% of amount will be distributed to NFT holders of winning team
            </ListItem>
            <ListItem>
              <Text fontSize={"17px"} color={"primary"} fontWeight={"bold"}>
                Runners-up -
              </Text>{" "}
              30% of amount will be distributed to NFT holders of runners-up
              team
            </ListItem>
            <ListItem>
              <Text fontSize={"17px"} color={"primary"} fontWeight={"bold"}>
                Yoda treasury pool -
              </Text>{" "}
              10% of the amount will be credited to Yoda treasury pool; out of
              this 5% will be given to top 15 users in terms of position volume
              on Yoda, while 5% will be kept in Yoda treasury
            </ListItem>
          </ol>
        </ListItem>
        <ListItem>
          NFTs can be sold on secondary marketplaces such as{" "}
          <BlueUnderline
            href="https://opensea.io/collection/yoda-icc-t20-wc21-nft"
            target="_blank"
            rel={"noreferrer"}
          >
            OpenSea
          </BlueUnderline>{" "}
          at any point in time
        </ListItem>
      </ol>
      <p>
        For further details, please read{" "}
        <BlueUnderline
          target="_blank"
          rel={"noreferrer"}
          href="https://medium.com/@yodadotxyz/introducing-yodas-nft-prediction-markets-d5ba1ac7fcf1"
        >
          here
        </BlueUnderline>
      </p>
    </Wrapper>
  );
};

export default HowItWorksModal;
