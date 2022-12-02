import { gameToken, maticNft, network } from "./Constants";
import { Contract, Provider } from "ethers-multicall";
import { BigNumber } from "@ethersproject/bignumber";
const erc20Contract = require("./abis/usdc.json");
const NftContract = require("./abis/NftContract.json");
const ethers = require("ethers");

export const expandDecimals = (amount, decimals = "18") => {
  return ethers.utils.parseUnits(String(amount), decimals);
};

export const formatDecimals = (amount, decimals = "18") => {
  return ethers.utils.formatUnits(String(amount), decimals);
};

export const getApproval = async (args) => {
  try {
    const erc20Instance = new ethers.Contract(
      gameToken.address,
      erc20Contract.abi,
      window.web3Provider
    );
    const result = await erc20Instance.allowance(
      args.userAddress,
      args.spenderAddress
    );
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};
export const getBalanceOfBatch = async (userAddress, teamArr) => {
  try {
    console.log("...awaiting balance");
    const nftContract = new ethers.Contract(
      maticNft,
      NftContract,
      window.web3Provider
    );
    const result = await nftContract.balanceOfBatch(
      [
        userAddress,
        userAddress,
        userAddress,
        userAddress,
        userAddress,
        userAddress,
        userAddress,
        userAddress,
      ],
      [0, 1, 2, 3, 4, 5, 6, 7]
    );
    console.log(result);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export const getUSDCBalance = async (args) => {
  try {
    const usdcContract = new ethers.Contract(
      gameToken.address,
      erc20Contract.abi,
      window.web3Provider
    );
    const result = await usdcContract.balanceOf(args.userAddress);
    return result;
  } catch (error) {
    console.log("Error", error);
  }
};

export const claimableExact = async (id, tokenAmount, balance) => {
  try {
    let rate;
    let totalLocked;
    let claim = ethers.constants.Zero;

    const bigId = BigNumber.from(id);
    const bigTokenAmount = BigNumber.from(tokenAmount);
    const bigBalance = BigNumber.from(balance);

    const nftContract = new ethers.Contract(
      maticNft,
      NftContract,
      window.web3Provider
    );
    const [
      winner,
      runnerUp,
      winnerRate,
      winnerTotalLocked,
      runnerUpRate,
      runnerUpTotalLocked,
      rewardPoolLocked,
    ] = await Promise.all([
      nftContract.winner(),
      nftContract.runnerUp(),
      nftContract.winnerRate(),
      nftContract.winnerTotalLocked(),
      nftContract.runnerUpRate(),
      nftContract.runnerUpTotalLocked(),
      nftContract.rewardPoolLocked(),
    ]);

    if (bigId.eq(winner)) {
      rate = winnerRate;
      totalLocked = winnerTotalLocked;
    } else if (bigId.eq(runnerUp)) {
      rate = runnerUpRate;
      totalLocked = runnerUpTotalLocked;
    } else return ethers.constants.Zero;

    if (bigBalance.lt(bigTokenAmount)) return ethers.constants.Zero;
    if (totalLocked.eq(ethers.constants.Zero))
      claim = claim.add(ethers.constants.Zero);
    else if (bigId.eq(ethers.constants.MaxUint256))
      claim = claim.add(ethers.constants.Zero);
    else
      claim = claim.add(
        bigTokenAmount.mul(rewardPoolLocked.mul(rate).div(100)).div(totalLocked)
      );
    return claim;
  } catch (error) {
    console.log("Error", error);
  }
};
// export const getEndtime = async (args) => {
//   try {
//     const nftContract = new ethers.Contract(
//       maticNft,
//       NftContract,
//       window.web3Provider
//     );
//     const result = await nftContract.endTime();
//     return result;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };
// export const getWinner = async (args) => {
//   try {
//     const nftContract = new ethers.Contract(
//       maticNft,
//       NftContract,
//       window.web3Provider
//     );
//     const result = await nftContract.winner();
//     return result;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };
// export const getRunnerUp = async (args) => {
//   try {
//     const nftContract = new ethers.Contract(
//       maticNft,
//       NftContract,
//       window.web3Provider
//     );
//     const result = await nftContract.runnerUp();
//     return result;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };
// export const getRewardPoolLocked = async (args) => {
//   try {
//     const nftContract = new ethers.Contract(
//       maticNft,
//       NftContract,
//       window.web3Provider
//     );
//     const result = await nftContract.rewardPoolLocked();
//     return result;
//   } catch (error) {
//     console.log("Error", error);
//   }
// };

export const setApproval = async (args) => {
  try {
    const erc20Instance = new ethers.Contract(
      gameToken.address,
      erc20Contract.abi,
      args.signer
    );
    const tx = await erc20Instance.approve(
      args.recipient,
      ethers.constants.MaxUint256
    );

    let result = await window.web3Provider.waitForTransaction(tx.hash);
    console.log(result);
    if (result.status == 1) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("Error", error);
  }
};
export const buyToken = async (args) => {
  try {
    const nftContract = new ethers.Contract(maticNft, NftContract, args.signer);
    const tx = await nftContract.buy(args.id, args.amount);

    // let result = await window.web3Provider.waitForTransaction(tx.hash);
    // console.log(result);
    return tx;
  } catch (error) {
    console.log("Error", error);
  }
};
export const claimRewardExact = async (args) => {
  try {
    const nftContract = new ethers.Contract(maticNft, NftContract, args.signer);
    const tx = await nftContract.claimRewardExact(args.id, args.amount);

    // let result = await window.web3Provider.waitForTransaction(tx.hash);
    return tx;
  } catch (error) {
    console.log("Error", error);
  }
};
const rpcProvider = new ethers.providers.JsonRpcProvider(network.rpc);

export async function getNftInfo() {
  try {
    const ethcallProvider = new Provider(rpcProvider);
    await ethcallProvider.init();

    const nftContract = new Contract(maticNft, NftContract);
    const USDCContract = new Contract(gameToken.address, erc20Contract.abi);

    const nftEndTimeCall = nftContract.endTime();
    const nftWinnerCall = nftContract.winner();
    const nftRunnerUpCall = nftContract.runnerUp();
    const nftBasePriceCall = nftContract.BASE_PRICE();
    const nftRewardPoolLockedCall = nftContract.rewardPoolLocked();
    const winnerRateCall = nftContract.winnerRate();
    const winnerTotalLockedCall = nftContract.winnerTotalLocked();
    const runnerUpRateCall = nftContract.runnerUpRate();
    const runnerUpTotalLockedCall = nftContract.runnerUpTotalLocked();
    const nftTotalTeamCall = nftContract.totalTeams();
    const uriCall = nftContract.uri(0);
    const USDCBalanceCall = USDCContract.balanceOf(maticNft);

    const [
      USDCBalance,
      nftEndTime,
      nftBasePrice,
      nftWinner,
      nftRewardPoolLocked,
      nftRunnerUp,
      nftTotalTeam,
      winnerRate,
      winnerTotalLocked,
      runnerUpRate,
      runnerUpTotalLocked,
      uri,
    ] = await ethcallProvider.all([
      USDCBalanceCall,
      nftEndTimeCall,
      nftBasePriceCall,
      nftWinnerCall,
      nftRewardPoolLockedCall,
      nftRunnerUpCall,
      nftTotalTeamCall,
      winnerRateCall,
      winnerTotalLockedCall,
      runnerUpRateCall,
      runnerUpTotalLockedCall,
      uriCall,
    ]);

    return {
      USDCBalance,
      nftEndTime,
      nftBasePrice,
      nftWinner,
      nftRewardPoolLocked,
      nftRunnerUp,
      nftTotalTeam,
      winnerRate,
      winnerTotalLocked,
      runnerUpRate,
      runnerUpTotalLocked,
      uri,
    };
    // console.log("ETH Balance:", ethBalance.toString());
    // console.log("nftEndTime Balance:", nftEndTime.toString());
    // console.log("nftWinner Balance:", nftWinner.toString());
    // console.log("nftRunnerUp Balance:", nftRunnerUp.toString());
    // nftBalanceOfBatch.map((i) => {
    //   console.log(i, " Balance:", i.toString());
    // });
  } catch (error) {
    console.log("Error", error);
  }
}

export async function getAllMinted(teamArr) {
  try {
    const ethcallProvider = new Provider(rpcProvider);
    await ethcallProvider.init();

    const nftContract = new Contract(maticNft, NftContract);

    const mintedData = await ethcallProvider.all(
      teamArr?.map((team) => nftContract.totalSupply(team?.id))
    );

    return mintedData;
  } catch (error) {
    console.log("Error", error);
  }
}
export async function getAllBalances(userAddress, teamArr) {
  try {
    const ethcallProvider = new Provider(rpcProvider);
    await ethcallProvider.init();
    const nftContract = new Contract(maticNft, NftContract);

    const balances = await ethcallProvider.all(
      teamArr?.map((team) => nftContract.balanceOf(userAddress, team?.id))
    );

    return balances;
  } catch (error) {
    console.log("Error", error);
  }
}
