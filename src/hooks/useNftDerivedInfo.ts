import { useEffect, useCallback } from "react";
import {
  useImages,
  useMetadata,
  useMinted,
  useUpdateInfo,
} from "../state/nft/hooks";
import useWeb3Modal from "./useWeb3Modal";
import { getAllMinted } from "../config/NftContractFunctions";
import useNftInfo from "./useNftInfo";
import numToArray from "../utils/numToArray";
import axios from "axios";
import { padAndHexConvertor } from "../utils";
import { teamNFT } from "../config/Constants";
import uriMetadata from "../config/uriMetadata";

const useNftDerivedInfo = () => {
  const { currentAccountAddress } = useWeb3Modal();
  const [minted, setMinted] = useMinted();
  const [images, setImages] = useImages();
  const [metadata, setMetadata] = useMetadata();
  const [updateInfo] = useUpdateInfo();
  const { totalTeams, uri } = useNftInfo();

  const setMintedInfo = useCallback(async () => {
    if (totalTeams) {
      const teamArr = numToArray(parseInt(totalTeams));
      const minted = await getAllMinted(teamArr);
      setMinted(minted ? minted.map((item, i) => item.toString()) : []);
      if (uri) {
        // const metaDataRes = await Promise.all(
        //   teamArr.map((team) =>
        //     axios.get(
        //       `https://gateway.pinata.cloud/ipfs/${uri?.substr(
        //         7,
        //         46
        //       )}/${padAndHexConvertor(team.id, 64)}.json`
        //     )
        //   )
        // );
        // console.log(metaDataRes);
        // setMetadata(metaDataRes.map((res) => res.data));
        setMetadata(teamArr.map((team, i) => uriMetadata[i]));
        setImages(
          teamArr.map((item, i) =>
            uriMetadata[i]
              ? uriMetadata[i].properties.type === "normal"
                ? teamNFT[uriMetadata[i]?.properties.shortForm]
                : uriMetadata[i].properties.type === "winner"
                ? teamNFT[uriMetadata[i]?.properties.shortForm + "_WINNER"]
                : uriMetadata[i].properties.type === "runnerUp"
                ? teamNFT[uriMetadata[i]?.properties.shortForm + "_RUNNER_UP"]
                : undefined
              : undefined
          )
        );
        // setImages(
        //   metaDataRes.map((res) =>
        //     res.data
        //       ? `https://gateway.pinata.cloud/ipfs/${res.data?.properties.lowResImage.substring(
        //           7,
        //           res.data?.properties.lowResImage.length
        //         )}`
        //       : undefined
        //   )
        // );
      }
    }
  }, [setMinted, totalTeams, uri]);
  useEffect(() => {
    setMintedInfo();
  }, [setMintedInfo, window.web3Provider, currentAccountAddress, updateInfo]);
  return { minted, images, metadata };
};

export default useNftDerivedInfo;
