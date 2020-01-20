import { IProviderInfo, IProviderMappingEntry } from "../helpers/types";
import connectors from "../core/connectors";
import { INJECTED_PROVIDER_ID } from "../helpers/constants";
import { FALLBACK_INJECTED, injected } from "./injected";

// @ts-ignore
import WalletConnectLogo from "../assets/walletconnect-circle.svg";
// @ts-ignore
import PortisLogo from "../assets/portis.svg";
// @ts-ignore
import SquarelinkLogo from "../assets/squarelink.svg";
// @ts-ignore
import FortmaticLogo from "../assets/fortmatic.svg";
// @ts-ignore
import ArkaneLogo from "../assets/arkane.svg";
// @ts-ignore
import TorusLogo from "../assets/torus.png";
// @ts-ignore
import AuthereumLogo from "../assets/authereum.svg";

export const FALLBACK = FALLBACK_INJECTED;

export const WALLETCONNECT_PROVIDER: IProviderInfo = {
  id: "walletconnect",
  name: "WalletConnect",
  logo: WalletConnectLogo,
  type: "qrcode",
  check: "isWalletConnect",
  styled: {
    noShadow: false
  },
  package: {
    required: ["infuraId"]
  }
};

export const PORTIS_PROVIDER: IProviderInfo = {
  id: "portis",
  name: "Portis",
  logo: PortisLogo,
  type: "web",
  check: "isPortis",
  styled: {
    noShadow: true
  },
  package: {
    required: ["id"]
  }
};

export const FORTMATIC_PROVIDER: IProviderInfo = {
  id: "fortmatic",
  name: "Fortmatic",
  logo: FortmaticLogo,
  type: "web",
  check: "isFortmatic",
  styled: {
    noShadow: true
  },
  package: {
    required: ["key"]
  }
};

export const SQUARELINK_PROVIDER: IProviderInfo = {
  id: "squarelink",
  name: "Squarelink",
  logo: SquarelinkLogo,
  type: "web",
  check: "isSquarelink",
  styled: {
    noShadow: true
  },
  package: {
    required: ["id"]
  }
};

export const TORUS_PROVIDER: IProviderInfo = {
  id: "torus",
  name: "Google",
  logo: TorusLogo,
  type: "web",
  check: "isTorus",
  styled: {
    noShadow: false
  },
  package: {
    required: []
  }
};

export const ARKANE_PROVIDER: IProviderInfo = {
  id: "arkane",
  name: "Arkane",
  logo: ArkaneLogo,
  type: "web",
  check: "isArkane",
  styled: {
    noShadow: true
  },
  package: {
    required: ["clientId"]
  }
};

export const AUTHEREUM_PROVIDER: IProviderInfo = {
  id: "authereum",
  name: "Authereum",
  logo: AuthereumLogo,
  type: "web",
  check: "isAuthereum",
  styled: {
    noShadow: true
  },
  package: {
    required: []
  }
};

export const providers: IProviderInfo[] = [
  ...injected,
  WALLETCONNECT_PROVIDER,
  SQUARELINK_PROVIDER,
  PORTIS_PROVIDER,
  FORTMATIC_PROVIDER,
  ARKANE_PROVIDER,
  TORUS_PROVIDER,
  AUTHEREUM_PROVIDER
];

export const providerMapping: IProviderMappingEntry[] = [
  {
    id: INJECTED_PROVIDER_ID,
    name: "",
    connector: connectors.injected,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: WALLETCONNECT_PROVIDER.id,
    name: WALLETCONNECT_PROVIDER.name,
    connector: connectors.walletconnect,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: PORTIS_PROVIDER.id,
    name: PORTIS_PROVIDER.name,
    connector: connectors.portis,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: FORTMATIC_PROVIDER.id,
    name: FORTMATIC_PROVIDER.name,
    connector: connectors.fortmatic,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: SQUARELINK_PROVIDER.id,
    name: SQUARELINK_PROVIDER.name,
    connector: connectors.squarelink,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: TORUS_PROVIDER.id,
    name: TORUS_PROVIDER.name,
    connector: connectors.torus,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: ARKANE_PROVIDER.id,
    name: ARKANE_PROVIDER.name,
    connector: connectors.arkane,
    package: WALLETCONNECT_PROVIDER.package
  },
  {
    id: AUTHEREUM_PROVIDER.id,
    name: AUTHEREUM_PROVIDER.name,
    connector: connectors.authereum,
    package: WALLETCONNECT_PROVIDER.package
  }
];
