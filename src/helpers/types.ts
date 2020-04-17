export interface ICoreOptions extends IProviderControllerOptions {
  lightboxOpacity: number;
  theme: string | ThemeColors;
}

export interface IProviderControllerOptions {
  cacheProvider: boolean;
  providerOptions: IProviderOptions;
  network: string;
}

export interface IAbstractConnectorOptions {
  network: string;
}

export interface IInjectedProvidersMap {
  injectedAvailable: boolean;
  [isProviderName: string]: boolean;
}

export interface IProviderInfo {
  id: string;
  name: string;
  type: string;
  logo: string;
  check: string;
  package?: IProviderPackageOptions;
  description?: string;
}

export interface IProviderPackageOptions {
  required?: string[];
}

export interface IProviderStyledOptions {
  [prop: string]: any;
}

export interface IProviderOptions {
  [id: string]: {
    package: any;
    options: any;
  };
}

export interface IProviderMappingEntry {
  id: string;
  name: string;
  connector: any;
  package?: IProviderPackageOptions;
}

export interface IProviderCallback {
  name: string | null;
  onClick: () => Promise<void>;
}

export type SimpleFunction = (input?: any) => void;

export interface IEventCallback {
  event: string;
  callback: (result: any) => void;
}

export type ChainData = {
  chainId: number;
  chain: string;
  network: string;
  networkId: number;
};

export type ChainDataList = {
  [chainId: number]: ChainData;
};

export type ThemeColors = {
  background: string;
  main: string;
  secondary: string;
  border: string;
  hover: string;
};

export interface IThemeConfig {
  name: string;
  colors: ThemeColors;
}

export type ThemesList = {
  [name: string]: IThemeConfig;
};

export interface IConnectorsMap {
  [id: string]: (provider?: any, opts?: any) => Promise<any>;
}
