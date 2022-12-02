import { network } from '../config/Constants';
//@ts-ignore
//import {Biconomy} from "@biconomy/mexa"

const biconomyAPIKey = process.env.REACT_APP_BICONOMY_API_KEY as string;
const biconomyAPIKeyUSDC = process.env.REACT_APP_BICONOMY_API_KEY_USDC as string;
const RPC = network.rpc

const Biconomy = require("@biconomy/mexa")
const Web3 = require("web3");

export async function initializeBiconomy() {
  const biconomy = new Biconomy(new Web3.providers.HttpProvider(RPC), { apiKey: biconomyAPIKey, debug: false });
  let web3 = new Web3(biconomy);
  window.biconomyWeb3 = web3
  biconomy.onEvent(biconomy.READY, () => {
    console.debug("Mexa is Ready");
  }).onEvent(biconomy.ERROR, (error: any, message: any) => {
    // Handle error while initializing mexa
    console.debug("Error", error);
  })

  const biconomyUSDC = new Biconomy(new Web3.providers.HttpProvider(RPC), { apiKey: biconomyAPIKeyUSDC, debug: false });
  let web3USDC = new Web3(biconomyUSDC);
  window.biconomyWeb3USDC = web3USDC
  biconomyUSDC.onEvent(biconomyUSDC.READY, () => {
    console.debug("Mexa is Ready");
  }).onEvent(biconomyUSDC.ERROR, (error: any, message: any) => {
    // Handle error while initializing mexa
    console.debug("Error", error);
  })
}
