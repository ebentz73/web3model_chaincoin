import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "../components/Modal";
import {
  ICoreOptions,
  IProviderCallback,
  ICacheProviderOptions
} from "../helpers/types";

import EventController from "./controllers/events";
import ProviderController from "./controllers/providers";
import {
  WEB3_CONNECT_MODAL_ID,
  CONNECT_EVENT,
  ERROR_EVENT,
  CLOSE_EVENT,
  ONCLICK
} from "../helpers/constants";

const INITIAL_STATE = { show: false };

const defaultOpts = {
  lightboxOpacity: 0.4,
  cacheProvider: false,
  providerOptions: {},
  network: ""
};

class Core {
  private show: boolean = INITIAL_STATE.show;
  private eventController: EventController = new EventController();
  private lightboxOpacity: number;
  private providerController: ProviderController;
  private providers: IProviderCallback[];

  constructor(opts?: Partial<ICoreOptions>) {
    const options: ICoreOptions = {
      ...defaultOpts,
      ...opts
    };

    this.lightboxOpacity = options.lightboxOpacity;

    this.providerController = new ProviderController({
      cacheProvider: options.cacheProvider,
      providerOptions: options.providerOptions,
      network: options.network
    });

    this.providerController.on(CONNECT_EVENT, provider =>
      this.onConnect(provider)
    );
    this.providerController.on(ERROR_EVENT, error => this.onError(error));

    this.providers = this.providerController.getProviders();
    this.renderModal();
  }

  get cachedProvider(): string {
    return this.providerController.cachedProvider;
  }

  get shouldCacheProvider(): boolean | ICacheProviderOptions {
    return this.providerController.shouldCacheProvider;
  }

  // --------------- PUBLIC METHODS --------------- //

  public clearCachedProvider(): void {
    this.providerController.clearCachedProvider();
  }

  public on(event: string, callback: (result: any) => void): () => void {
    this.eventController.on({
      event,
      callback
    });

    return () =>
      this.eventController.off({
        event,
        callback
      });
  }

  public off(event: string, callback?: (result: any) => void): void {
    this.eventController.off({
      event,
      callback
    });
  }

  public toggleModal = async () => {
    if (
      ((typeof this.shouldCacheProvider === "string" &&
        this.shouldCacheProvider === ONCLICK) ||
        this.shouldCacheProvider === true) &&
      this.cachedProvider
    ) {
      await this.providerController.connectToCachedProvider();
      return;
    }
    if (
      this.providers &&
      this.providers.length === 1 &&
      this.providers[0].name
    ) {
      await this.providers[0].onClick();
      return;
    }
    await this._toggleModal();
  };

  public renderModal() {
    const el = document.createElement("div");
    el.id = WEB3_CONNECT_MODAL_ID;
    document.body.appendChild(el);

    ReactDOM.render(
      <Modal
        providers={this.providers}
        onClose={this.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.lightboxOpacity}
      />,
      document.getElementById(WEB3_CONNECT_MODAL_ID)
    );
  }

  // --------------- PRIVATE METHODS --------------- //

  private _toggleModal = async () => {
    const d = typeof window !== "undefined" ? document : "";
    const body = d ? d.body || d.getElementsByTagName("body")[0] : "";
    if (body) {
      if (this.show) {
        body.style.overflow = "";
      } else {
        body.style.overflow = "hidden";
      }
    }
    await this.updateState({ show: !this.show });
  };

  private onError = async (error: any) => {
    if (this.show) {
      await this._toggleModal();
    }
    this.eventController.trigger(ERROR_EVENT, error);
  };

  private onConnect = async (provider: any) => {
    if (this.show) {
      await this._toggleModal();
    }
    this.eventController.trigger(CONNECT_EVENT, provider);
  };

  private onClose = async () => {
    if (this.show) {
      await this._toggleModal();
    }
    this.eventController.trigger(CLOSE_EVENT);
  };

  private updateState = async (state: any) => {
    Object.keys(state).forEach(key => {
      this[key] = state[key];
    });
    await window.updateWeb3ConnectModal(state);
  };

  private resetState = () => this.updateState({ ...INITIAL_STATE });
}

export default Core;
