import React from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import MetamaskLogo from "../assets/Metamask.svg";

const Wrapper = styled.div`
  display: none;
  ${({ theme }) => theme.mediaWidth.upToSmall`
  &&&{
  display: inline-block;
  }
`}
`;
const StyledMain = styled.p`
  width: auto;
  height: auto;
  border-radius: 15px;
  margin: 10px;
  padding-bottom: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid #4c4b4b14;
  box-shadow: 12px 12px 25px #1a1b1c73;
  padding: 10px;
  position: relative;
`;
const StyledClose = styled(CloseIcon)`
  &&& {
    font-size: 18px;
    float: right;
  }
`;
const Metamask = styled.img`
&&&{
  width: 60px;

}
`
const CenterDiv = styled.div`
&&&{
  display: flex;
}
`
const Text = styled.p`
&&&{
  margin: auto;
  margin-left: 10px;
  font-weight: bold;
  color: white;
  font-size: 12px;}
`
interface Props {
   close: () => void;
}
function Notefication({close}:Props) {
  return (
    <Wrapper>
      <StyledMain>
      <StyledClose onClick={close}/>
        <CenterDiv>
      <Metamask src={MetamaskLogo} />
      <Text>
          Please use the website within Metamask app browser for a seamless
          experience.
          </Text>
          </CenterDiv>
      </StyledMain>
    </Wrapper>
  );
}

export default Notefication;
