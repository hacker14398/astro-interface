import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface Metadata {
  name: string;
  description: string;
  image: string;
  properties: {
    shortForm: string;
    type: string;
    lowResImage: string;
  };
}
interface NftReducerState {
  basePrice: string | undefined;
  endTime: string | undefined;
  winner: undefined | string;
  runnerUp: undefined | string;
  rewardPoolLocked: undefined | string;
  minted: (undefined | string)[];
  totalTeams: undefined | string;
  winnerRate: undefined | string;
  winnerTotalLocked: undefined | string;
  runnerUpRate: undefined | string;
  runnerUpTotalLocked: undefined | string;
  showConfirmationCard: boolean;
  updateInfo: boolean;
  userBalances: (undefined | string)[];
  usdcBalance: undefined | string;
  uri: undefined | string;
  metadata: Metadata[];
  images: (string | undefined)[];
}

const initialState: NftReducerState = {
  basePrice: undefined,
  endTime: undefined,
  winner: undefined,
  runnerUp: undefined,
  rewardPoolLocked: undefined,
  minted: [],
  totalTeams: undefined,
  winnerRate: undefined,
  winnerTotalLocked: undefined,
  runnerUpRate: undefined,
  runnerUpTotalLocked: undefined,
  userBalances: [],
  metadata: [],
  images: [],
  showConfirmationCard: false,
  updateInfo: false,
  usdcBalance: undefined,
  uri: undefined,
};

export const nft = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setBasePrice: (state, action: PayloadAction<string | undefined>) => {
      state.basePrice = action.payload;
    },
    setEndTime: (state, action: PayloadAction<string | undefined>) => {
      state.endTime = action.payload;
    },
    setWinner: (state, action: PayloadAction<string | undefined>) => {
      state.winner = action.payload;
    },
    setRunnerUp: (state, action: PayloadAction<string | undefined>) => {
      state.runnerUp = action.payload;
    },
    setRewardPoolLocked: (state, action: PayloadAction<string | undefined>) => {
      state.rewardPoolLocked = action.payload;
    },
    setMinted: (state, action: PayloadAction<(string | undefined)[]>) => {
      state.minted = action.payload;
    },
    setMetadata: (state, action: PayloadAction<Metadata[]>) => {
      state.metadata = action.payload;
    },
    setImages: (state, action: PayloadAction<(string | undefined)[]>) => {
      state.images = action.payload;
    },
    setUserBalances: (state, action: PayloadAction<(string | undefined)[]>) => {
      state.userBalances = action.payload;
    },
    setTotalTeam: (state, action: PayloadAction<string | undefined>) => {
      state.totalTeams = action.payload;
    },
    setWinnerRate: (state, action: PayloadAction<string | undefined>) => {
      state.winnerRate = action.payload;
    },
    setWinnerTotalLocked: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.winnerTotalLocked = action.payload;
    },
    setRunnerUpRate: (state, action: PayloadAction<string | undefined>) => {
      state.runnerUpRate = action.payload;
    },
    setRunnerUpTotalLocked: (
      state,
      action: PayloadAction<string | undefined>
    ) => {
      state.runnerUpTotalLocked = action.payload;
    },
    setUri: (state, action: PayloadAction<string | undefined>) => {
      state.uri = action.payload;
    },
    setShowConfirmationCard: (state, action: PayloadAction<boolean>) => {
      state.showConfirmationCard = action.payload;
    },
    setUpdateInfo: (state, action: PayloadAction<boolean>) => {
      state.updateInfo = action.payload;
    },
    setUsdcBalance: (state, action: PayloadAction<string | undefined>) => {
      state.usdcBalance = action.payload;
    },
  },
});

export const {
  setBasePrice,
  setEndTime,
  setWinner,
  setRunnerUp,
  setRewardPoolLocked,
  setMinted,
  setTotalTeam,
  setWinnerRate,
  setWinnerTotalLocked,
  setRunnerUpRate,
  setRunnerUpTotalLocked,
  setUserBalances,
  setShowConfirmationCard,
  setUpdateInfo,
  setUsdcBalance,
  setUri,
  setMetadata,
  setImages,
} = nft.actions;

export const basePrice = (state: RootState) => state.nft.basePrice;
export const endTime = (state: RootState) => state.nft.endTime;
export const winner = (state: RootState) => state.nft.winner;
export const runnerUp = (state: RootState) => state.nft.runnerUp;
export const rewardPoolLocked = (state: RootState) =>
  state.nft.rewardPoolLocked;
export const minted = (state: RootState) => state.nft.minted;
export const totalTeams = (state: RootState) => state.nft.totalTeams;
export const winnerRate = (state: RootState) => state.nft.winnerRate;
export const winnerTotalLocked = (state: RootState) =>
  state.nft.winnerTotalLocked;
export const runnerUpRate = (state: RootState) => state.nft.runnerUpRate;
export const runnerUpTotalLocked = (state: RootState) =>
  state.nft.runnerUpTotalLocked;
export const userBalances = (state: RootState) => state.nft.userBalances;
export const showConfirmationCard = (state: RootState) =>
  state.nft.showConfirmationCard;
export const updateInfo = (state: RootState) => state.nft.updateInfo;
export const usdcBalance = (state: RootState) => state.nft.usdcBalance;
export const uri = (state: RootState) => state.nft.uri;
export const images = (state: RootState) => state.nft.images;
export const metadata = (state: RootState) => state.nft.metadata;

export default nft.reducer;
