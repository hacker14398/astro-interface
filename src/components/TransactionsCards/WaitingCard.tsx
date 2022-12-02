import React from "react";
import styled, { keyframes } from "styled-components";
import loaderCircle from "../../assets/vectors/spinner-ellipse.png";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { getFlooredFixed } from "../../utils";

interface Props {
  message: string;
  close: () => void;
}

const Wrapper = styled.div`
  width: 378px;
  height: 390px;
  opacity: 1;
  border-radius: 15px;
  backdrop-filter: opacity(0.3);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  display: grid;
  place-items: center;
  padding-top: 60px;
  padding-bottom: 25px;
  position: relative;
  background: #ffffff10;
  color: white;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        max-width: 350px;
		width: 95vw;
  	`};
`;

const FullRotate = keyframes`
    0%{
        transform: rotate(0deg)
    }
    100%{
        transform: rotate(360deg)
    }
`;

const SpinningImage = styled.img`
  animation: ${FullRotate} 1.3s ease-in-out infinite;
  margin-bottom: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width: 150px;
  	`};
`;
const Heading = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: 0em;
  text-align: center;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 22px;
  	`};
`;

const SwapState = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 16px;
  	`};
`;

const ConfirmAction = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff80;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size: 14px;
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

export const WaitingCard = ({ message, close }: Props) => {
  return (
    <Wrapper>
      <StyledCloseIcon onClick={close} />
      <SpinningImage src={loaderCircle} />
      <Heading>Waiting for Confirmation</Heading>
      <SwapState>{message}</SwapState>
      <ConfirmAction>Confirm this transaction in your wallet</ConfirmAction>
    </Wrapper>
  );
};
