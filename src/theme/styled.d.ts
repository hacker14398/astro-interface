import {
  FlattenSimpleInterpolation,
  ThemedCssFunction,
} from "styled-components";

export type Color = string;
export interface Colors {
  // base
  white: Color;
  black: Color;

  // text
  text1: Color;

  // backgrounds / greys
  bg1: Color;

  //blues
  primary1: Color;

  // pinks
  secondary1: Color;

  // other
  red1: Color;
  red2: Color;
  red3: Color;
  green1: Color;
  green2: Color;
  green3: Color;
  yellow1: Color;
  yellow2: Color;
  yellow3: Color;
  blue1: Color;
  lightBlue1: Color;
  white1: Color;
  teal1: Color;
  gray1: Color;
  gray2: Color;
  gray3: Color;
}

export interface Grids {
  sm: number;
  md: number;
  lg: number;
}

declare module "styled-components" {
  export interface DefaultTheme extends Colors {
    grids: Grids;

    // shadows
    shadow1: string;

    // media queries
    mediaWidth: {
      upToExtraSmall: ThemedCssFunction<DefaultTheme>;
      upToSmall: ThemedCssFunction<DefaultTheme>;
      upToMedium: ThemedCssFunction<DefaultTheme>;
      upToLarge: ThemedCssFunction<DefaultTheme>;
    };

    // css snippets
    flexColumnNoWrap: FlattenSimpleInterpolation;
    flexRowNoWrap: FlattenSimpleInterpolation;
  }
}
