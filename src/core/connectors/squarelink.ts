import { importProviderPackage } from "../../helpers/utils";
import { providerPackages } from "../../providers";

export interface INetwork {
  nodeUrl: string;
  chainId?: string;
}

export interface IOptions {
  scope?: string[];
}

export interface ISquarelinkConnectorOptions {
  id: string;
  network?: string | INetwork;
  config?: IOptions;
}

const ConnectToSquarelink = async (opts: ISquarelinkConnectorOptions) => {
  const Squarelink = importProviderPackage(providerPackages.squarelink.name);
  return new Promise(async (resolve, reject) => {
    if (opts && opts.id) {
      try {
        const id = opts.id;
        const network = opts.network || "mainnet";
        const config = opts.config;
        const sqlk = new Squarelink(id, network, config);
        const provider = await sqlk.getProvider();
        await provider.enable();
        return resolve(provider);
      } catch (error) {
        return reject(new Error("Failed to login to Squarelink"));
      }
    } else {
      return reject(new Error("Missing Squarelink Id"));
    }
  });
};

export default ConnectToSquarelink;
