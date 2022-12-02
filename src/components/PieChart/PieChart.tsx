import styled from "styled-components";
import React from "react";
import { SVG, WonSlice, LostSlice, Wrapper, Info } from "./PieChartStyles";
// import { TYPE } from "theme";

/**
 * Bare minimum chart that doesn't require any external dependencies
 * For details read here - https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
 */

interface PieChartProps {
  won: number;
  lost: number;
}

const Won = styled.p`
  font: normal normal 500 23px/30px Roboto;
  color: ${({ theme }) => theme.lightBlue1};
  @media only screen and (max-width: 900px) {
    font-size: 16px;
    line-height: 20px;
  }
`;
const Ratio = styled.p`
  font: normal normal bold 31px/40px Roboto;
  color: ${({ theme }) => theme.text1};
  @media only screen and (max-width: 900px) {
    font-size: 20px;
    line-height: 25px;
  }
`;
const Percentage = styled.p`
  font: normal normal medium 17px/23px Roboto;
  color: ${({ theme }) => theme.green2};
  @media only screen and (max-width: 900px) {
    font-size: 12px;
    line-height: 15px;
  }
`;

// 2 * Pi * R
const CIRCUMFERENCE = 276.4601;

const PieChart: React.FC<PieChartProps> = ({ lost, won }) => {
  const percentageWon =
    lost + won ? ((won * 100) / (lost + won)).toFixed(2) : "0";
  const paintLost = (lost / (won + lost)) * CIRCUMFERENCE;
  const paintWon = CIRCUMFERENCE - paintLost;
  return (
    <Wrapper>
      <SVG viewBox="0 0 128 128">
        <LostSlice r="44" cx="64" cy="64" length={CIRCUMFERENCE} />
        <WonSlice r="44" cx="64" cy="64" length={paintWon} offset={paintLost} />
      </SVG>
      <Info>
        <Won>{"Won"}</Won>
        <Ratio>
          {won}/{won + lost}
        </Ratio>
        <Percentage>{percentageWon ? percentageWon : "-"}%</Percentage>
      </Info>
    </Wrapper>
  );
};

export default PieChart;
