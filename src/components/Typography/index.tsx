import { Typography as CustomTypography } from "@mui/material";
import styled from "styled-components";

interface TypographyProps {
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2";
  color?: string;
  fontSize?: number;
  fontWeight?: string | number;
}

const StyledCustomTypography = styled(CustomTypography)<{
  color?: string;
  fontSize?: number;
  fontWeight?: string | number;
}>`
  color: ${({ theme, color }) => {
    if (color === "primary1") return theme.primary1;
    if (color === "red1") return theme.red1;
    if (color === "green1") return theme.green1;
    if (color === "lightBlue1") return theme.lightBlue1;
    return theme.text1;
  }};
  font-weight: ${({ fontWeight }) => {
    if (fontWeight) return fontWeight;
    return "normal";
  }};
  font-size: ${({ fontSize }) => {
    if (fontSize) return fontSize + "px";
    return "18px";
  }};
`;
const Typography: React.FC<TypographyProps> = ({
  variant = "h1",
  children,
  color,
  fontSize,
  fontWeight,
}) => {
  return (
    <StyledCustomTypography
      variant={variant}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </StyledCustomTypography>
  );
};

export default Typography;
