import styled from "styled-components";
import Button from "@mui/material/Button";
const Base = styled(Button)<{
  padding?: string;
  width?: string;
  borderRadius?: string;
  altDisabledStyle?: boolean;
}>`
  &&& {
    padding: ${({ padding }) => (padding ? padding : "18px")};
    width: ${({ width }) => (width ? width : "100%")};
    font-weight: 500;
    font-family: Roboto, helvetica;
    position: relative;
    text-align: center;
    border-radius: 6px;
    border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
    outline: none;
    border: 1px solid transparent;
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
  }
  &&&&:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.gray1};
  }
  /* > * {
    user-select: none;
  } */
`;

export const ButtonPrimary = styled(Base)`
  &&& {
    background-color: ${({ theme }) => theme.primary1};
    color: white;
  }
`;

export const ButtonConfirm = styled(Base)`
  &&& {
    background-color: ${({ theme }) => theme.green2};
    color: white;
  }
`;

export const ButtonGhostGray = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.gray2};
  border: 1px solid ${({ theme }) => theme.gray2};
  cursor: text;
`;
export const ButtonGhostLightblue = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.lightBlue1};
  border: 1px solid ${({ theme }) => theme.lightBlue1};
  cursor: text;
`;
export const ButtonBlue = styled(Base)`
  &&& {
    background-color: #;
    color: ${({ theme }) => theme.white};
  }
`;
export const ButtonGreen = styled(Base)`
  &&& {
    background-color: #00a576;
    color: ${({ theme }) => theme.white};
  }
`;
export const ButtonGold = styled(Base)`
  &&& {
    background-color: #e9d04e;
    color: ${({ theme }) => theme.black};
  }
`;
export const ButtonSilver = styled(Base)`
  &&& {
    background-color: #c0c0c0;
    color: ${({ theme }) => theme.black};
  }
`;
