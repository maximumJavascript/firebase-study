import { baseUrl } from '../constants/api';
import { RequestService } from './requestService';
import { STATUS_LOADING, STATUS_READY } from '../constants/fetch';

export class FetchStore {
  #requestService;
  #abortController = new AbortController();

  status = STATUS_READY;
  signal = this.#abortController.signal;

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
      const status = await res.json();
      throw new Error(status);
    }
  }

  async sendRequest() {
    this.status = STATUS_LOADING;
    const request = this.#requestService.createRequest(this.body, this.options);
    const response = await fetch(request);
    FetchStore.checkResponse(response);
    const result = await response.json();
    this.status = STATUS_READY;
    return result;
  }
}
