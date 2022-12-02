import { ethers } from "ethers";
import { useEffect, useCallback } from "react";
import { getNftInfo } from "../config/NftContractFunctions";
import {
  useBasePrice,
  useEndTime,
  useMinted,
  useRewardPoolLocked,
  useRunnerUp,
  useRunnerUpRate,
  useRunnerUpTotalLocked,
  useTotalTeam,
  useUpdateInfo,
  useUri,
  useWinner,
  useWinnerRate,
  useWinnerTotalLocked,
} from "../state/nft/hooks";
const useNftInfo = () => {
  const [basePrice, setBasePrice] = useBasePrice();
  const [endTime, setEndTime] = useEndTime();
  const [winner, setWinner] = useWinner();
  const [runnerUp, setRunnerUp] = useRunnerUp();
  const [rewardPoolLocked, setRewardPoolLocked] = useRewardPoolLocked();
  const [totalTeams, setTotalTeam] = useTotalTeam();
  const [winnerRate, setWinnerRate] = useWinnerRate();
  const [winnerTotalLocked, setWinnerTotalLocked] = useWinnerTotalLocked();
  const [runnerUpRate, setRunnerUpRate] = useRunnerUpRate();
  const [uri, setUri] = useUri();
  const [runnerUpTotalLocked, setRunnerUpTotalLocked] =
    useRunnerUpTotalLocked();
  const [updateInfo] = useUpdateInfo();

  const setNftInfo = useCallback(async () => {
    const res = await getNftInfo();
    setBasePrice(res?.nftBasePrice?.toString());
    setEndTime(res?.nftEndTime?.toString());
    setWinner(res?.nftWinner?.toString());
    setRunnerUp(res?.nftRunnerUp?.toString());
    setWinnerRate(res?.winnerRate?.toString());
    setWinnerTotalLocked(res?.winnerTotalLocked?.toString());
    setRunnerUpRate(res?.runnerUpRate?.toString());
    setRunnerUpTotalLocked(res?.runnerUpTotalLocked?.toString());
    setUri(res?.uri?.toString());
    if (!res?.nftWinner.eq(ethers.constants.MaxUint256)) {
      setRewardPoolLocked(res?.nftRewardPoolLocked?.toString());
      setTotalTeam(res?.nftTotalTeam?.add(2).toString());
    } else {
      setTotalTeam(res?.nftTotalTeam?.toString());
      setRewardPoolLocked(res?.USDCBalance?.toString());
    }
  }, [
    setBasePrice,
    setEndTime,
    setWinner,
    setRunnerUp,
    setTotalTeam,
    setWinnerRate,
    setWinnerTotalLocked,
    setRunnerUpRate,
    setRunnerUpTotalLocked,
    setRewardPoolLocked,
    setUri,
  ]);
  useEffect(() => {
    setNftInfo();
  }, [setNftInfo, updateInfo]);

  return {
    basePrice,
    endTime,
    winner,
    runnerUp,
    rewardPoolLocked,
    totalTeams,
    winnerRate,
    winnerTotalLocked,
    runnerUpRate,
    runnerUpTotalLocked,
    uri,
  };
};
export default useNftInfo;
