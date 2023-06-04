import { baseUrl } from '../constants/api';
import { RequestService } from './requestService';

export class FetchStore {
  #requestService;
  status = 0;
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
    searchParams = {},
    contentType,
    signal,
  } = {}) {
    this.body = body;
    this.options = {
      requiredAuth,
      method,
      contentType,
      params,
      searchParams,
      signal: signal ? signal : this.signal,
    };
    const url = new URL(baseUrl);
    const pathname = url.pathname === '/' ? route : url.pathname + route;
    url.pathname = pathname;
    this.#requestService = new RequestService(url);
  }

  async checkResponse(res) {
    this.status = res.status;
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
    const request = await this.#requestService.createRequest(this.body, this.options);
    const response = await fetch(request);
    await this.checkResponse(response);
    const result = await response.json();
    if (requiredMinDelay) await this.waitMinDelay(fetchStartTime);
    if (this.signal.aborted) throw new Error('Aborted');
    this.status = 0;
    return result;
  }
}
