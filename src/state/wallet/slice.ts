import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface WalletState {
  account: string | undefined;
  chainId: string | undefined;
  walletId: string | undefined;
  connected: boolean;
  showWalletModal: boolean;
  userBalance: string | undefined;
}

const initialState: WalletState = {
  account: undefined,
  chainId: undefined,
  walletId: undefined,
  showWalletModal: false,
  connected: false,
  userBalance: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAccount: (state, action: PayloadAction<string | undefined>) => {
      state.account = action.payload;
    },
    setChainId: (state, action: PayloadAction<string | undefined>) => {
      state.chainId = action.payload;
    },
    setWalletId: (state, action: PayloadAction<string | undefined>) => {
      state.walletId = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setShowWalletModal: (state, action: PayloadAction<boolean>) => {
      state.showWalletModal = action.payload;
    },
    setUserBalance: (state, action: PayloadAction<string | undefined>) => {
      state.userBalance = action.payload;
    },
  },
});

export const { setAccount, setChainId, setWalletId, setConnected, setUserBalance, setShowWalletModal } =
  walletSlice.actions;

export const account = (state: RootState) => state.wallet.account;
export const chainId = (state: RootState) => state.wallet.chainId;
export const walletId = (state: RootState) => state.wallet.walletId;
export const connected = (state: RootState) => state.wallet.connected;
export const showWalletModal = (state: RootState) => state.wallet.showWalletModal;
export const userBalance = (state: RootState) => state.wallet.userBalance;
export default walletSlice.reducer;
