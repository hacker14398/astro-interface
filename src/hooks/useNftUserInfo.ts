import { useCallback, useEffect } from "react";
import { getAllBalances, getUSDCBalance } from "../config/NftContractFunctions";
import {
  useUpdateInfo,
  useUserBalances,
  useUsdcBalance,
} from "../state/nft/hooks";
import numToArray from "../utils/numToArray";
import useNftInfo from "./useNftInfo";
import useWeb3Modal from "./useWeb3Modal";

const useNftUserInfo = () => {
  const { currentAccountAddress } = useWeb3Modal();
  const [userBalances, setUserBalances] = useUserBalances();
  const [usdcBalance, setUsdcBalance] = useUsdcBalance();
  const [updateInfo] = useUpdateInfo();
  const { totalTeams } = useNftInfo();
  const setNftInfo = useCallback(async () => {
    if (currentAccountAddress && totalTeams) {
      const teamArr = numToArray(parseInt(totalTeams));
      const balances = await getAllBalances(currentAccountAddress, teamArr);
      setUserBalances(
        balances ? balances.map((item, i) => item.toString()) : []
      );
      const usdcBalanceRes = await getUSDCBalance({
        userAddress: currentAccountAddress,
      });
      setUsdcBalance(usdcBalanceRes?.toString());
    }
  }, [
    setUserBalances,
    setUsdcBalance,
    window.web3Provider,
    currentAccountAddress,
    totalTeams,
  ]);
  useEffect(() => {
    if (window.web3Provider) {
      setNftInfo();
    }
  }, [
    setNftInfo,
    window.web3Provider,
    currentAccountAddress,
    updateInfo,
    totalTeams,
  ]);
  return { userBalances, usdcBalance };
};

export default useNftUserInfo;
