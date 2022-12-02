import { useCallback } from "react";
import { Metadata } from "./slice";
import {
  useAppSelector as useSelector,
  useAppDispatch as useDispatch,
} from "../../hooks";
// import { setShowConfirmationCard, showConfirmationCard } from "../questions/slice";
import {
  basePrice,
  endTime,
  minted,
  rewardPoolLocked,
  runnerUp,
  runnerUpRate,
  runnerUpTotalLocked,
  setBasePrice,
  setEndTime,
  setMinted,
  setRewardPoolLocked,
  setRunnerUp,
  setRunnerUpRate,
  setRunnerUpTotalLocked,
  setTotalTeam,
  setUserBalances,
  setWinner,
  setWinnerRate,
  setWinnerTotalLocked,
  totalTeams,
  userBalances,
  winner,
  winnerRate,
  winnerTotalLocked,
  updateInfo,
  setUpdateInfo,
  usdcBalance,
  setUsdcBalance,
  uri,
  setUri,
  images,
  setImages,
  setMetadata,
  metadata,
} from "./slice";

export function useBasePrice(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentBasePrice = useSelector(basePrice);
  const dispatch = useDispatch();

  const setCurrentBasePrice = useCallback(
    (newBasePrice: string | undefined) => dispatch(setBasePrice(newBasePrice)),
    [dispatch]
  );

  return [currentBasePrice, setCurrentBasePrice];
}

export function useEndTime(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentEndTime = useSelector(endTime);
  const dispatch = useDispatch();

  const setCurrentEndTime = useCallback(
    (newEndTime: string | undefined) => dispatch(setEndTime(newEndTime)),
    [dispatch]
  );

  return [currentEndTime, setCurrentEndTime];
}
export function useWinner(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentWinner = useSelector(winner);
  const dispatch = useDispatch();

  const setCurrentWinner = useCallback(
    (newWinner: string | undefined) => dispatch(setWinner(newWinner)),
    [dispatch]
  );

  return [currentWinner, setCurrentWinner];
}
export function useRunnerUp(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentRunnerUp = useSelector(runnerUp);
  const dispatch = useDispatch();

  const setCurrentRunnerUp = useCallback(
    (newRunnerUp: string | undefined) => dispatch(setRunnerUp(newRunnerUp)),
    [dispatch]
  );

  return [currentRunnerUp, setCurrentRunnerUp];
}
export function useRewardPoolLocked(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentRewardPoolLocked = useSelector(rewardPoolLocked);
  const dispatch = useDispatch();

  const setCurrentRewardPoolLocked = useCallback(
    (newRewardPoolLocked: string | undefined) =>
      dispatch(setRewardPoolLocked(newRewardPoolLocked)),
    [dispatch]
  );

  return [currentRewardPoolLocked, setCurrentRewardPoolLocked];
}
export function useMinted(): [
  (string | undefined)[],
  (newMinted: (string | undefined)[]) => void
] {
  const currentMinted = useSelector(minted);
  const dispatch = useDispatch();

  const setCurrentMinted = useCallback(
    (newMinted: (string | undefined)[]) => dispatch(setMinted(newMinted)),
    [dispatch]
  );

  return [currentMinted, setCurrentMinted];
}
export function useImages(): [
  (string | undefined)[],
  (newImages: (string | undefined)[]) => void
] {
  const currentImages = useSelector(images);
  const dispatch = useDispatch();

  const setCurrentImages = useCallback(
    (newImages: (string | undefined)[]) => dispatch(setImages(newImages)),
    [dispatch]
  );

  return [currentImages, setCurrentImages];
}
export function useMetadata(): [Metadata[], (newMetadata: Metadata[]) => void] {
  const currentMetadata = useSelector(metadata);
  const dispatch = useDispatch();

  const setCurrentMetadata = useCallback(
    (newMetadata: Metadata[]) => dispatch(setMetadata(newMetadata)),
    [dispatch]
  );

  return [currentMetadata, setCurrentMetadata];
}
export function useUserBalances(): [
  (string | undefined)[],
  (newUserBalances: (string | undefined)[]) => void
] {
  const currentUserBalances = useSelector(userBalances);
  const dispatch = useDispatch();

  const setCurrentUserBalances = useCallback(
    (newUserBalances: (string | undefined)[]) =>
      dispatch(setUserBalances(newUserBalances)),
    [dispatch]
  );

  return [currentUserBalances, setCurrentUserBalances];
}
export function useTotalTeam(): [
  string | undefined,
  (newBasePrice: string | undefined) => void
] {
  const currentTotalTeam = useSelector(totalTeams);
  const dispatch = useDispatch();

  const setCurrentTotalTeam = useCallback(
    (newTotalTeam: string | undefined) => dispatch(setTotalTeam(newTotalTeam)),
    [dispatch]
  );

  return [currentTotalTeam, setCurrentTotalTeam];
}
export function useWinnerRate(): [
  string | undefined,
  (newWinnerRate: string | undefined) => void
] {
  const currentWinnerRate = useSelector(winnerRate);
  const dispatch = useDispatch();

  const setCurrentWinnerRate = useCallback(
    (newWinnerRate: string | undefined) =>
      dispatch(setWinnerRate(newWinnerRate)),
    [dispatch]
  );

  return [currentWinnerRate, setCurrentWinnerRate];
}
export function useWinnerTotalLocked(): [
  string | undefined,
  (newWinnerTotalLocked: string | undefined) => void
] {
  const currentWinnerTotalLocked = useSelector(winnerTotalLocked);
  const dispatch = useDispatch();

  const setCurrentWinnerTotalLocked = useCallback(
    (newWinnerTotalLocked: string | undefined) =>
      dispatch(setWinnerTotalLocked(newWinnerTotalLocked)),
    [dispatch]
  );

  return [currentWinnerTotalLocked, setCurrentWinnerTotalLocked];
}
export function useRunnerUpRate(): [
  string | undefined,
  (newRunnerUpRate: string | undefined) => void
] {
  const currentRunnerUpRate = useSelector(runnerUpRate);
  const dispatch = useDispatch();

  const setCurrentRunnerUpRate = useCallback(
    (newRunnerUpRate: string | undefined) =>
      dispatch(setRunnerUpRate(newRunnerUpRate)),
    [dispatch]
  );

  return [currentRunnerUpRate, setCurrentRunnerUpRate];
}
export function useRunnerUpTotalLocked(): [
  string | undefined,
  (newRunnerUpTotalLocked: string | undefined) => void
] {
  const currentRunnerUpTotalLocked = useSelector(runnerUpTotalLocked);
  const dispatch = useDispatch();

  const setCurrentRunnerUpTotalLocked = useCallback(
    (newRunnerUpTotalLocked: string | undefined) =>
      dispatch(setRunnerUpTotalLocked(newRunnerUpTotalLocked)),
    [dispatch]
  );

  return [currentRunnerUpTotalLocked, setCurrentRunnerUpTotalLocked];
}
export function useUsdcBalance(): [
  string | undefined,
  (newUsdcBalance: string | undefined) => void
] {
  const currentUsdcBalance = useSelector(usdcBalance);
  const dispatch = useDispatch();

  const setCurrentUsdcBalance = useCallback(
    (newUsdcBalance: string | undefined) =>
      dispatch(setUsdcBalance(newUsdcBalance)),
    [dispatch]
  );

  return [currentUsdcBalance, setCurrentUsdcBalance];
}
export function useUri(): [
  string | undefined,
  (newUri: string | undefined) => void
] {
  const currentUri = useSelector(uri);
  const dispatch = useDispatch();

  const setCurrentUri = useCallback(
    (newUri: string | undefined) => dispatch(setUri(newUri)),
    [dispatch]
  );

  return [currentUri, setCurrentUri];
}

export function useUpdateInfo(): [boolean, (newUpdateInfo: boolean) => void] {
  const currentUpdateInfo = useSelector(updateInfo);
  const dispatch = useDispatch();

  const setCurrentUpdateInfo = useCallback(
    (newUpdateInfo: boolean) => dispatch(setUpdateInfo(newUpdateInfo)),
    [dispatch]
  );

  return [currentUpdateInfo, setCurrentUpdateInfo];
}
