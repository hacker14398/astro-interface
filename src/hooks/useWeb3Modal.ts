import Web3Modal from "web3modal";
import { useCallback, useMemo, useEffect } from "react";
import { providers } from "ethers";
import { providerOptions } from "../config/ProviderConfig";
import {
  useAccountAddress,
  useChainId,
  useWalletId,
  useWalletConnected,
} from "../state/wallet/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";
import useLocalStorage from "./useLocalStorage";

const useWeb3Modal = () => {
  const [currentAccountAddress, setCurrentAccountAddress] = useAccountAddress();
  const [currentChainID, setCurrentChainID] = useChainId();
  const [currentWalletId, setCurrentWalletId] = useWalletId();
  const [, setIsWalletConnected] = useWalletConnected();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [cacheWalletId, setCacheWalletId] = useLocalStorage("WEB3_MODAL", "");
  const web3Modal = useMemo(() => {
    return new Web3Modal({
      providerOptions, // required
    });
  }, []);

  const connect = useCallback(
    async (id: string) => {
      const provider = await web3Modal.connectTo(id);
      setCacheWalletId(id);
      const web3Provider = new providers.Web3Provider(provider);

      const signer = web3Provider.getSigner();
      const account = await signer.getAddress();

      const network = await web3Provider.getNetwork();
      window.provider = provider;
      window.web3Provider = web3Provider;
      setCurrentAccountAddress(account);
      setCurrentChainID(network.chainId.toString());
      setCurrentWalletId(id);
      setIsWalletConnected(true);
    },
    [
      setCurrentAccountAddress,
      setCurrentChainID,
      setCurrentWalletId,
      setIsWalletConnected,
      web3Modal,
    ]
  );
  const disconnect = useCallback(
    async function () {
      // await web3Modal.clearCachedProvider();
      setCacheWalletId("");
      if (
        window.provider?.disconnect &&
        typeof window.provider?.disconnect === "function"
      ) {
        await window.provider?.disconnect();
      }
      window.provider = undefined;
      window.web3Provider = undefined;
      setCurrentAccountAddress(undefined);
      setCurrentChainID(undefined);
      setCurrentWalletId(undefined);
      setIsWalletConnected(false);
    },
    [
      window.provider,
      window.web3Provider,
      setCurrentAccountAddress,
      setCurrentChainID,
      setCurrentWalletId,
      setIsWalletConnected,
      web3Modal,
    ]
  );

  useEffect(() => {
    if (window.provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged", accounts);
        setCurrentAccountAddress(accounts[0]);
      };

      const handleChainChanged = (chainId: string) => {
        console.log("chainId", parseInt(chainId, 16));
        setCurrentChainID(parseInt(chainId, 16).toString());
      };

      // const handleDisconnect = (error: { code: number; message: string }) => {
      //   // eslint-disable-next-line no-console
      //   console.log("disconnect", error);
      //   disconnect();
      // };

      window.provider?.on("accountsChanged", handleAccountsChanged);
      window.provider?.on("chainChanged", handleChainChanged);
      //window.provider?.on("disconnect", handleDisconnect);

      // Subscription Cleanup
      return () => {
        if (window.provider?.removeListener) {
          window.provider?.removeListener(
            "accountsChanged",
            handleAccountsChanged
          );
          window.provider?.removeListener("chainChanged", handleChainChanged);
          //window.provider?.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [
    window.provider,
    disconnect,
    setCurrentAccountAddress,
    setCurrentChainID,
  ]);

  const connectMetaMaskMobile = () => {
    if(isMobile) {
      if(window.ethereum){
        connect("injected")
      }
    }
  }

  useEffect(() => {
    if (cacheWalletId && cacheWalletId !== "" && !isMobile) {
      connect(cacheWalletId);
    }

    if (window.ethereum) {
      connectMetaMaskMobile();
    } else {
      window.addEventListener('ethereum#initialized', connectMetaMaskMobile, {
        once: true,
      });
      setTimeout(connectMetaMaskMobile, 3000);
    }
    return () => window.removeEventListener('ethereum#initialized', connectMetaMaskMobile);
  }, [cacheWalletId, connect]);

  return {
    currentAccountAddress,
    currentChainID,
    currentWalletId,
    connect,
    disconnect,
  };
};

export default useWeb3Modal;
