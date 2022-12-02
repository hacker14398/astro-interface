import { useCallback } from "react";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../hooks";
import {
  setAccount,
  setChainId,
  setWalletId,
  account,
  chainId,
  walletId,
  setConnected,
  connected,
  userBalance,
  setUserBalance,
  setShowWalletModal,
  showWalletModal,
} from "./slice";

export function useAccountAddress(): [
  string | undefined,
  (args: string | undefined) => void
] {
  const currentAccountAddress = useSelector(account);
  const dispatch = useDispatch();

  const setCurrentAccountAddress = useCallback(
    (args: string | undefined) => dispatch(setAccount(args)),
    [dispatch]
  );

  return [currentAccountAddress, setCurrentAccountAddress];
}
export function useChainId(): [
  string | undefined,
  (args: string | undefined) => void
] {
  const currentChainId = useSelector(chainId);
  const dispatch = useDispatch();

  const setCurrentChainId = useCallback(
    (args: string | undefined) => dispatch(setChainId(args)),
    [dispatch]
  );

  return [currentChainId, setCurrentChainId];
}
export function useWalletId(): [
  string | undefined,
  (args: string | undefined) => void
] {
  const currentWalletId = useSelector(walletId);
  const dispatch = useDispatch();

  const setCurrentWalletId = useCallback(
    (args: string | undefined) => dispatch(setWalletId(args)),
    [dispatch]
  );

  return [currentWalletId, setCurrentWalletId];
}
export function useWalletConnected(): [boolean, (args: boolean) => void] {
  const currentWalletConnected = useSelector(connected);
  const dispatch = useDispatch();

  const setCurrentWalletConnected = useCallback(
    (args: boolean) => dispatch(setConnected(args)),
    [dispatch]
  );

  return [currentWalletConnected, setCurrentWalletConnected];
}

export function useWalletModal(): [boolean, (args: boolean) => void] {
  const currentShowWalletModal = useSelector(showWalletModal);
  const dispatch = useDispatch();

  const setCurrentShowWalletModal = useCallback(
    (args: boolean) => dispatch(setShowWalletModal(args)),
    [dispatch]
  );

  return [currentShowWalletModal, setCurrentShowWalletModal];
}

export function useUserBalance(): [string | undefined, (args: string | undefined) => void] {
  const currentUserBalance = useSelector(userBalance);
  const dispatch = useDispatch();

  const setCurrentUserBalance = useCallback(
    (args: string | undefined) => dispatch(setUserBalance(args)),
    [dispatch]
  );

  return [currentUserBalance, setCurrentUserBalance];
}
