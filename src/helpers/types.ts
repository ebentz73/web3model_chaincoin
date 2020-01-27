import { ONLOAD, ONCLICK } from "./constants";

const CacheProviderOptions = {
  [ONLOAD]: ONLOAD,
  [ONCLICK]: ONCLICK
};

export type ICacheProviderOptions = keyof typeof CacheProviderOptions;

export interface ICoreOptions extends IProviderControllerOptions {
  lightboxOpacity: number;
}

export interface IProviderControllerOptions {
  cacheProvider: boolean | ICacheProviderOptions;
  providerOptions: IProviderOptions;
  network: string;
}

export interface IProviderInfo {
  id: string;
  name: string;
  type: string;
  logo: string;
  check: string;
  package: IProviderPackageOptions;
  styled: IProviderStyledOptions;
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

export type SimpleFunction = (input?: any) => void;

export interface IEventCallback {
  event: string;
  callback: (result: any) => void;
}

export interface IInjectedProvidersMap {
  injectedAvailable: boolean;
  [isProviderName: string]: boolean;
}

export interface IProviderCallback {
  name: string | null;
  onClick: () => Promise<void>;
}

export interface IProviderMappingEntry {
  id: string;
  name: string;
  connector: any;
  package: IProviderPackageOptions;
}

export interface IProviderPackageOptions {
  required: string[];
}
