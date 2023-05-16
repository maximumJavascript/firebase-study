import { baseUrl } from '../constants/api';
import { RequestService } from './requestService';

export class FetchService {
  #requestService;

  constructor(route = '/') {
    const basePathRoute = new URL(baseUrl);
    basePathRoute.pathname = route;
    // http://localhost:3001/users - пример basePathRoute
    this.#requestService = new RequestService(basePathRoute);
  }

  static async checkResponse(res) {
    if (!res.ok) {
      if (res.statusText) throw new Error(res.statusText);
      const status = await res.text();
      throw new Error(status);
    }
  }

  async fetchRequest(
    body,
    { requiredAuth, method, content_type, params, route } = {
      requiredAuth: false,
      method: 'GET',
      params: {},
    }
  ) {
    const abortController = new AbortController();
    const request = this.#requestService.createRequest({
      ...arguments,
      signal: abortController.signal,
    });
    const fetchRequest = fetch(request);
    const res = await fetchRequest;
    FetchService.checkResponse(res);
    const result = await (res.headers.get('Content-Type').includes('application/json')
      ? res.json()
      : res.text());
    return result;
    // return {
    //   async getFetchResult() {
    //     const res = await fetchRequest;
    //     FetchService.checkResponse(res);
    //     const result = await (res.headers.get('Content-Type').includes('application/json')
    //       ? res.json()
    //       : res.text());
    //     return result;
    //   },
    //   abortFetch() {
    //     abortController.abort();
    //   },
    // };
  }
}
