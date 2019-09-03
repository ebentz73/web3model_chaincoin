import { getProviderPackage } from "../../helpers/utils";
import { providerPackages } from "../../providers";

export interface IFortmaticConnectorOptions {
  key: string;
  network?: string;
}

const ConnectToFortmatic = async (opts: IFortmaticConnectorOptions) => {
  const Fortmatic = getProviderPackage(providerPackages.fortmatic.name);
  if (opts && opts.key) {
    try {
      const key = opts.key;
      const fm = new Fortmatic(key, opts.network);
      const provider = await fm.getProvider();
      await fm.user.login();
      const isLoggedIn = await fm.user.isLoggedIn();
      if (isLoggedIn) {
        return provider;
      } else {
        throw new Error("Failed to login to Fortmatic");
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Missing Fortmatic key");
  }
};

export default ConnectToFortmatic;
