import React from "react";
import styled from "styled-components";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import arrow from "../../../assets/vectors/group-23.png";
import ellipse from "../../../assets/vectors/ellipse-55.png";
import { useHistory } from "react-router";
import {
  useExplorerLink,
} from "../../../state/questions/hooks";
import TwitterIcon from "@mui/icons-material/Twitter";
interface Props {
  close: () => void;
}

const Wrapper = styled.div`
  color: white;
  width: 390px;
  height: 450px;
  opacity: 1;
  border-radius: 15px;
  backdrop-filter: opacity(0.3);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  display: grid;
  place-items: center;
  padding-top: 40px;
  padding-bottom: 12px;
  background: #ffffff10;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 350px;
		width: 95vw;
  	`};
`;
const StyledCloseIcon = styled(CloseRoundedIcon)`
  position: absolute;
  color: white;
  right: 10px;
  top: 10px;
  width: 1.7rem !important;
  height: 1.7rem !important;
  cursor: pointer;
`;
const TransactionIcon = styled.div`
  background: url(${ellipse});
  width: 86px;
  height: 86px;
  display: grid;
  place-items: center;
`;
const Heading = styled.div`
  margin-top: 35px;
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 0px;
  letter-spacing: 0em;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 22px;
  	`};
`;

const Explorer = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  line-height: 2px;
  text-align: center;
  text-decoration-line: underline;
  color: #fa025d;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 16px;
  	`};
`;

const CloseButton = styled.div`
  width: 300px;
  height: 55px;
  background: #fa025d;
  border-radius: 10px;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
  display: grid;
  place-items: center;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 20px;
        width: 95%;
        height: 50px;
  	`};
`;

const TwitterLink = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
interface ConfirmationCardNftProps {
  close: () => void;
  link: string;
}
const ConfirmationCardNft = ({ close, link }: ConfirmationCardNftProps) => {
  const history = useHistory();
  const [explorerLink] = useExplorerLink();
  const openTransaction = () => {
    window.open(explorerLink);
  };
  console.log(link);
  const tweetUrl = `https://twitter.com/share?url=https://www.yoda.xyz&via=yoda_xyz&text=I just bought my NFT and rooting for ${link} to win the World Cup!&hashtags=WorldCup,NFT`;

  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <TransactionIcon>
        <img src={arrow} />
      </TransactionIcon>
      <Heading>You have successfully bought NFT</Heading>
      <Explorer
        onClick={() => {
          history?.push("/nft/mynfts");
          close();
        }}
      >
        View Your Nfts On My Nfts
      </Explorer>
      <Explorer onClick={openTransaction}>View on explorer</Explorer>
      {link && (
        <TwitterLink
          onClick={() =>
            window.open(
              tweetUrl,
              "_blank",
              "resizable=yes,top=300,left=500,width=600,height=400"
            )
          }
        >
          Share on &nbsp;
          <TwitterIcon />
        </TwitterLink>
      )}
      <CloseButton onClick={close}>Close</CloseButton>
    </Wrapper>
  );
};
const ConfirmationCardApproveForNft = ({ close }: Props) => {
  const history = useHistory();
  const [explorerLink] = useExplorerLink();
  const openTransaction = () => {
    window.open(explorerLink);
  };

  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <TransactionIcon>
        <img src={arrow} />
      </TransactionIcon>
      <Heading>You have successfully Approved</Heading>
      <Explorer
        onClick={() => {
          history?.push("/nft");
          close();
        }}
      >
        You can now buy Nft
      </Explorer>
      {/* <Explorer onClick={openTransaction}>View on explorer</Explorer> */}
      <CloseButton onClick={close}>Close</CloseButton>
    </Wrapper>
  );
};
const ConfirmationCardClaim = ({ close }: Props) => {
  const history = useHistory();
  const [explorerLink] = useExplorerLink();
  const openTransaction = () => {
    window.open(explorerLink);
  };

  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <TransactionIcon>
        <img src={arrow} />
      </TransactionIcon>
      <Heading>Claimed Reward Successfully</Heading>
      <Explorer
        onClick={() => {
          history?.push("/nft/mynfts");
          close();
        }}
      >
        View Your Special Nfts On My Nfts
      </Explorer>
      <Explorer onClick={openTransaction}>View on explorer</Explorer>
      <CloseButton onClick={close}>Close</CloseButton>
    </Wrapper>
  );
};

export default ConfirmationCardNft;
export { ConfirmationCardApproveForNft, ConfirmationCardClaim };
