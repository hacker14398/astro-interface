import React, { useMemo } from "react";
import {
  ThemeProvider as StyledComponentsThemeProvider,
  css,
  DefaultTheme,
  createGlobalStyle,
} from "styled-components";
import { Colors } from "./styled";

export const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1300,
};

const mediaWidthTemplates: {
  [width in keyof typeof MEDIA_WIDTHS]: typeof css;
} = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  (accumulator as any)[size] = (a: any, b: any, c: any) => css`
    @media (max-width: ${(MEDIA_WIDTHS as any)[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return accumulator;
}, {}) as any;

const white = "#FFFFFF";
const black = "#000000";

export function colors(): Colors {
  return {
    // base
    white,
    black,

    // text
    text1: "#FFFFFF", //used

    // backgrounds / greys
    bg1: "linear-gradient(90deg, #170B3B 0%, #0E050F 100%);", //used

    //primary colors
    primary1: "#FF3F86",

    // secondary colors
    secondary1: "#ff007a",

    // other
    red1: "#E8425A",
    red2: "#EC4B49",
    red3: "#F8440A",
    green1: "#10773b",
    green2: "#16AF85",
    green3: "#30AA62",
    yellow1: "#FFE270",
    yellow2: "#00A575",
    yellow3: "#F2C94C",
    blue1: "#2172E5",
    lightBlue1: "#55B6F1",
    white1: "#FAFAFA",
    teal1: "#2E3146",
    gray1: "rgba(88, 88, 99, 0.24)",
    gray2: "#B5B7BC",
    gray3: "#DCDCDC",
  };
}

export function theme(): DefaultTheme {
  return {
    ...colors(),

    grids: {
      sm: 8,
      md: 12,
      lg: 24,
    },

    //shadows
    shadow1: "#000",

    // media queries
    mediaWidth: mediaWidthTemplates,

    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `,
  };
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeObject = useMemo(() => theme(), []);

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {children}
    </StyledComponentsThemeProvider>
  );
}

export const FixedGlobalStyle = createGlobalStyle`

html,
body {
  margin: 0;
  padding: 0;
}


* {
  box-sizing: border-box;
}

button {
  user-select: none;
}

`;

export const ThemedGlobalStyle = createGlobalStyle`
html {
  height:100%;
  color: ${({ theme }) => theme.text1};
  background: ${({ theme }) => theme.bg1};
}

body {
  min-height: 100vh;
  height:100%;
  background: ${({ theme }) => theme.bg1};
  font-family: Roboto, sans-serif;
}

/* width */
::-webkit-scrollbar {
  width: 0px
}
`;

// const TextWrapper = styled.p<{ color: keyof Colors,fontWeight: number, }>`
//   color: ${({ color, theme }) => (theme as any)[color]};
// `;

// export const TYPE = {
//   main(props: any) {
//     return <TextWrapper fontWeight={500} color={"text2"} {...props} />;
//   },
//   link(props: any) {
//     return <TextWrapper fontWeight={500} color={"primary1"} {...props} />;
//   },
//   black(props: any) {
//     return <TextWrapper fontWeight={500} color={"text1"} {...props} />;
//   },
//   white(props: any) {
//     return <TextWrapper fontWeight={500} color={"white"} {...props} />;
//   },
//   body(props: any) {
//     return (
//       <TextWrapper fontWeight={400} fontSize={16} color={"text1"} {...props} />
//     );
//   },
//   largeHeader(props: any) {
//     return <TextWrapper fontWeight={600} fontSize={24} {...props} />;
//   },
//   mediumHeader(props: any) {
//     return <TextWrapper fontWeight={500} fontSize={20} {...props} />;
//   },
//   subHeader(props: any) {
//     return <TextWrapper fontWeight={400} fontSize={14} {...props} />;
//   },
//   small(props: any) {
//     return <TextWrapper fontWeight={500} fontSize={11} {...props} />;
//   },
//   blue(props: any) {
//     return <TextWrapper fontWeight={500} color={"blue1"} {...props} />;
//   },
//   yellow(props: any) {
//     return <TextWrapper fontWeight={500} color={"yellow1"} {...props} />;
//   },
//   darkGray(props: any) {
//     return <TextWrapper fontWeight={500} color={"text3"} {...props} />;
//   },
//   gray(props: any) {
//     return <TextWrapper fontWeight={500} color={"bg3"} {...props} />;
//   },
//   italic(props: any) {
//     return (
//       <TextWrapper
//         fontWeight={500}
//         fontSize={12}
//         fontStyle={"italic"}
//         color={"text2"}
//         {...props}
//       />
//     );
//   },
//   error({ error, ...props }: { error: boolean }) {
//     return (
//       <TextWrapper
//         fontWeight={500}
//         color={error ? "red1" : "text1"}
//         {...props}
//       />
//     );
//   },
// };
