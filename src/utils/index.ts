import numeral from "numeral";
import { ethers } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { getAddress } from "@ethersproject/address";
import { AddressZero } from "@ethersproject/constants";
import {
  MatchData,
  QuestionBetData,
  QuestionBetDataMapping,
  QuestionMapping,
  UserBet,
  UserBetMapping,
} from "../state/questions/slice";
import {  getEpoch } from "./getEpoch";

export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(
    42 - chars
  )}`;
}

export const numeralformat = (value: any) => {
  if (value === "-") return "-";
  else return numeral(value).format("0.00a").toUpperCase();
};

export const numeralFormatNumber = (value: any) => {
  if (value === "-") return "-";
  else return numeral(value).format();
};

export const fixedDecimalPlace = (value: any, decimalPlace: number) => {
  if (value === "-") return "-";
  else return getFlooredFixed(parseFloat(value.toString()), decimalPlace);
};

export function getFlooredFixed(v: any, d: number) {
  v = parseFloat(v);
  return (
    parseFloat((Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d)) *
    1
  ).toString();
}

export const encodedID = (id: string) =>
  ethers.utils.keccak256(ethers.utils.toUtf8Bytes(id));

export const groupByIdQuestion = (items: QuestionBetData[] | undefined) =>
  items?.reduce(
    (result: QuestionBetDataMapping, item: QuestionBetData) => ({
      ...result,
      [item.id]: item,
    }),
    {}
  );

// export const groupById = <T extends { id?: any }>(items: T[] | undefined):{[x: string]: T;} | undefined => 
// items?.reduce(
//     (result:{[x: string]: T;}, item: T) => ({
//       ...result,
//       [item.id]: item,
//     }),
//     {}
//   );

export const groupByIdBet = (items: UserBet[] | undefined) =>
  items?.reduce(
    (result: UserBetMapping, item: UserBet) => ({
      ...result,
      [item.question.id]: item,
    }),
    {}
  );
  
function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any
  );
}
// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export const sortMatchData = (data: MatchData[]) => {
  const timeStamp = Math.round(Date.now() / 1000);
  //const finishedMatches = data.filter(match =>epochConverter(match.bid_end_time)>timeStamp)
  let lastEndedMatch = -1;
  data = data.filter(match=>timeStamp>getEpoch(match.question_show_start_time)&&timeStamp<getEpoch(match.question_show_end_time))
  for (let i = 0; i < data.length; i++) {
    if (timeStamp > getEpoch(data[i].bid_end_time)) {
      lastEndedMatch = i;
    } else {
      break;
    }
  }
  if (lastEndedMatch === -1) {
    return data;
  } else {
    return [
      ...data.slice(lastEndedMatch + 1, data.length),
      ...data.slice(0, lastEndedMatch + 1).reverse(),
    ];
  }
};

export const sortMyPositions = (
  data: UserBet[],
  questionData: QuestionMapping
) => {
  const livePositions = data
    .filter((bet) => !bet.question.ended)
    .sort(
      (a, b) =>
        getEpoch(questionData[a.question.id].bid_end_time) -
        getEpoch(questionData[b.question.id].bid_end_time)
    );
  const closedPositions = data
    .filter((bet) => bet.question.ended)
    .sort(
      (a, b) =>
        getEpoch(questionData[b.question.id].bid_end_time) -
        getEpoch(questionData[a.question.id].bid_end_time)
    );
  return [...livePositions, ...closedPositions];
};

export function padAndHexConvertor(num: number, size: number) {
  let numStr = num.toString(16);
  if (numStr) while (numStr.length < size) numStr = "0" + numStr;
  return numStr;
}

export const isEthereumListener = async () =>
				new Promise<string>((resolve) =>
					Object.defineProperty(window, 'ethereum', {
					configurable: true,
					set(value) {
						if(window.ethereum) resolve("true")
					},
					}),
				)
