import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import Torus from "@toruslabs/torus-embed";
import Authereum from "authereum";
// import { Bitski } from "bitski";
import Portis from "@portis/web3";
import metamaskLogo from "../assets/images/wallet-logos/metamask.svg";
import walletconnectLogo from "../assets/images/wallet-logos/walletconnect-circle.svg";
import fortmaticLogo from "../assets/images/wallet-logos/fortmatic.svg";
import portisLogo from "../assets/images/wallet-logos/portis.svg";
import torusLogo from "../assets/images/wallet-logos/torus.svg";
// import bitskiLogo from "../assets/images/wallet-logos/bitski.svg";
import coinbaseLogo from "../assets/images/wallet-logos/coinbase.svg";
import WalletLink from "walletlink";
// import {
//   BITSKI_KEY,
//   FORTMATIC_KEY,
//   INFURA_ID_WALLET,
//   PORTIS_KEY,
// } from "./config";
const FORTMATIC_KEY = process.env.REACT_APP_INFURA_ID;
const INFURA_ID_WALLET = process.env.REACT_APP_PORTIS_ID;
const PORTIS_KEY = process.env.REACT_APP_FORTMATIC_KEY;
const providerOptions = {
  injected: {
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID_WALLET,
      rpc: "https://kovan.infura.io/v3/",
    },
  },
  torus: {
    package: Torus,
    //options: {}
  },
  fortmatic: {
    package: Fortmatic,
    options: {
      key: FORTMATIC_KEY,
    },
  },
  portis: {
    package: Portis,
    options: {
      id: PORTIS_KEY,
    },
  },
  authereum: {
    package: Authereum,
  },
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)",
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_: any, options: any) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
  // bitski: {
  //   package: Bitski,
  //   options: {
  //     clientId: BITSKI_KEY,
  //     callbackUrl: window.location.href + "bitski-callback.html",
  //   },
  // },
};

const walletList = [
  {
    id: "injected",
    name: "Metamask",
    logo: metamaskLogo,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    logo: walletconnectLogo,
  },
  {
    id: "custom-walletlink",
    name: "Coinbase",
    logo: coinbaseLogo,
  },
  {
    id: "fortmatic",
    name: "Fortmatic",
    logo: fortmaticLogo,
  },
  {
    id: "portis",
    name: "Portis",
    logo: portisLogo,
  },
  {
    id: "torus",
    name: "Torus",
    logo: torusLogo,
  },
  // {
  //   id: "bitski",
  //   name: "Bitski",
  //   logo: bitskiLogo,
  // },
];

export { providerOptions, walletList };
