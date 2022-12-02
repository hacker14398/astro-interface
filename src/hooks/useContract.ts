import { useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import useWeb3Modal from "./useWeb3Modal";
import { getContract } from "../utils";
import ERC20_ABI from "../config/abis/erc20.json";
export function useContract(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): Contract | null {
  const { currentAccountAddress, currentChainID } = useWeb3Modal();
  const library = window.web3Provider;
  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !currentChainID)
      return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[parseInt(currentChainID)];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && currentAccountAddress
          ? currentAccountAddress
          : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    currentChainID,
    withSignerIfPossible,
    currentAccountAddress,
  ]) as Contract | null;
}

export function useTokenContract(
  tokenAddress?: string,
  withSignerIfPossible?: boolean
) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
