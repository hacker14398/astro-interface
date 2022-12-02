import { Button } from "@mui/material";
import { useState } from "react";
import styled from "styled-components";
import { walletList } from "../../config/ProviderConfig";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import useWeb3Modal from "../../hooks/useWeb3Modal";

interface Props {
  action: () => void;
  close: () => void;
}

const Wrapper = styled.div`
  font-size: 24px;
  font-weight: 500;
  opacity: 1;
  border-radius: 15px;
  backdrop-filter: opacity(0.3);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  color: ${({ theme }) => theme.text1};
  width: 25rem;
  height: 15rem;
  display: grid;
  place-items: center;
  padding: 25px 20px;
  padding-bottom: 40px;
  background: #ffffff20;
  ${({ theme }) => theme.mediaWidth.upToSmall`
		width: 90vw;
  	`};
`;

const ChangeButton = styled(Button)`
  &&& {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 20px;
    margin-bottom: 10px;
    width: 80px;
    height: 32px;
    background: #ffffff;
    color: ${({ theme }) => theme.red1};
    border-radius: 10px;
    font-weight: 400;
    font-size: 16px;
    border: none;
    text-transform: none;
  }
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
const CopyAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text1}50;
  font-weight: 300;
  font-size: 14px;
  position: absolute;
  left: 0;
  bottom: 0;
  margin-left: 20px;
  margin-bottom: 15px;
  cursor: pointer;
`;

const StyledFileCopyIcon = styled(FileCopyIcon)`
  &&& {
    margin-right: 5px;
    width: 14px;
  }
`;
const StyledCheck = styled(CheckCircleOutlineRoundedIcon)`
  &&& {
    margin-right: 5px;
    width: 16px;
  }
`;

const ChangeWallet = ({ action, close }: Props) => {
  const { currentAccountAddress, currentWalletId } = useWeb3Modal();

  const [copied, setCopied] = useState(false);

  const wallet = walletList.find((wallet) => wallet.id === currentWalletId);

  const copyToClipboard = () => {
    if (currentAccountAddress) {
      navigator.clipboard.writeText(currentAccountAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 4000);
    }
  };

  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <img
        alt={wallet?.name}
        src={wallet?.logo}
        style={{ width: "90px", height: "90px" }}
      />
      <span>{wallet?.name}</span>
      <ChangeButton onClick={action}>Change</ChangeButton>
      <CopyAddressWrapper onClick={copyToClipboard}>
        {copied ? <StyledCheck /> : <StyledFileCopyIcon />}
        {copied ? "Copied To Clipboard" : "Copy Address"}
      </CopyAddressWrapper>
    </Wrapper>
  );
};

export default ChangeWallet;
