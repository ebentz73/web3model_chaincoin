import * as React from "react";
import * as ReactDOM from "react-dom";
import Modal from "../components/Modal";
import { IProviderOptions, IProviderCallback } from "../helpers/types";

import EventManager from "./events";
import ProviderManager from "./providerManager";
import {
  WEB3_CONNECT_MODAL_ID,
  CONNECT_EVENT,
  ERROR_EVENT,
  CLOSE_EVENT
} from "../helpers/constants";

interface ICoreOptions {
  network: string;
  lightboxOpacity: number;
  providerOptions: IProviderOptions;
}

const INITIAL_STATE = { show: false };

class Core {
  private show: boolean = INITIAL_STATE.show;
  private eventManager: EventManager = new EventManager();
  private lightboxOpacity: number;
  private providerManager: ProviderManager;
  private providers: IProviderCallback[];

  constructor(opts?: Partial<ICoreOptions>) {
    const options: ICoreOptions = {
      lightboxOpacity: 0.4,
      providerOptions: {},
      network: "",
      ...opts
    };

    this.lightboxOpacity = options.lightboxOpacity;

    this.providerManager = new ProviderManager({
      providerOptions: options.providerOptions,
      network: options.network
    });

    this.providerManager.on(CONNECT_EVENT, provider =>
      this.onConnect(provider)
    );
    this.providerManager.on(ERROR_EVENT, error => this.onError(error));

    this.providers = this.providerManager.getProviders();
    this.renderModal();
  }

  // --------------- PUBLIC METHODS --------------- //

  public on(event: string, callback: (result: any) => void): () => void {
    this.eventManager.on({
      event,
      callback
    });

    return () =>
      this.eventManager.off({
        event,
        callback
      });
  }

  public off(event: string, callback?: (result: any) => void): void {
    this.eventManager.off({
      event,
      callback
    });
  }

  public toggleModal = async () => {
    if (
      this.providers &&
      this.providers.length === 1 &&
      this.providers[0].name
    ) {
      await this.providers[0].onClick();
      return;
    }

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

  private onError = async (error: any) => {
    if (this.show) {
      await this.toggleModal();
    }
    this.eventManager.trigger(ERROR_EVENT, error);
  };

  private onConnect = async (provider: any) => {
    if (this.show) {
      await this.toggleModal();
    }
    this.eventManager.trigger(CONNECT_EVENT, provider);
  };

  private onClose = async () => {
    if (this.show) {
      await this.toggleModal();
    }
    this.eventManager.trigger(CLOSE_EVENT);
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
