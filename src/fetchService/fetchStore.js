import { baseUrl } from '../constants/api';
import { RequestService } from './requestService';
import { STATUS_LOADING, STATUS_READY } from '../constants/fetch';

export class FetchStore {
  #requestService;
  #delayMS = 500;
  #delayTimeout;

  abortController = new AbortController();
  signal = this.abortController.signal;

  constructor({
    body,
    route = '/',
    requiredAuth = false,
    method = 'GET',
    params = {},
    contentType,
    signal,
  } = {}) {
    this.body = body;
    this.options = {
      requiredAuth,
      method,
      contentType,
      params,
      route,
      signal: signal ? signal : this.signal,
    };
    const basePathRoute = new URL(baseUrl);
    basePathRoute.pathname = route;
    this.#requestService = new RequestService(basePathRoute);
  }

  static async checkResponse(res) {
    if (!res.ok) {
      if (res.status === 404) throw new Error(res.statusText);
      const status = await res.json();
      throw new Error(status.data);
    }
  }

  async waitMinDelay(fetchStartTime = Date.now()) {
    const timeLeft = this.#delayMS - (Date.now() - fetchStartTime);
    await new Promise((res) => (this.#delayTimeout = setTimeout(() => res(), timeLeft)));
  }

  async sendRequest({ requiredMinDelay = false } = {}) {
    const fetchStartTime = Date.now();
    const request = this.#requestService.createRequest(this.body, this.options);
    const response = await fetch(request);
    await FetchStore.checkResponse(response);
    const result = await response.json();
    if (requiredMinDelay) await this.waitMinDelay(fetchStartTime);
    if (this.signal.aborted) throw new Error('Aborted');
    return result;
  }
}
