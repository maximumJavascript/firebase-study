import { baseUrl } from '../constants/api';
import { RequestService } from './requestService';
import { STATUS_LOADING, STATUS_READY } from '../constants/fetch';

export class FetchStore {
  #requestService;
  #delayMS = 500;
  #delayTimeout;

  status = STATUS_READY;
  abortController = new AbortController();
  signal = this.abortController.signal;

  constructor({
    body,
    route = '/',
    requiredAuth = false,
    method = 'GET',
    params = {},
    contentType,
  } = {}) {
    this.body = body;
    this.options = {
      requiredAuth,
      method,
      contentType,
      params,
      route,
      signal: this.signal,
    };
    const basePathRoute = new URL(baseUrl);
    basePathRoute.pathname = route;
    this.#requestService = new RequestService(basePathRoute);
  }

  static async checkResponse(res) {
    if (!res.ok) {
      const status = await (res.status === 404 ? res.statusText : res.json());
      throw new Error(status);
    }
  }

  async waitMinDelay(fetchStartTime = Date.now()) {
    const timeLeft = this.#delayMS - (Date.now() - fetchStartTime);
    await new Promise((res) => (this.#delayTimeout = setTimeout(() => res(), timeLeft)));
  }

  async sendRequest({ requiredMinDelay = false } = {}) {
    this.status = STATUS_LOADING;
    const fetchStartTime = Date.now();
    const request = this.#requestService.createRequest(this.body, this.options);
    const response = await fetch(request);
    await FetchStore.checkResponse(response);
    const result = await response.json();
    if (requiredMinDelay) await this.waitMinDelay(fetchStartTime);
    this.status = STATUS_READY;
    return result;
  }
}
