import { HeadersService } from './headersService';
import { auth } from '../firebase-config';

export class RequestService {
  constructor(basePathRoute) {
    this.basePathRoute = new URL(basePathRoute);
  }

  withUrlParams(params, searchParams) {
    const cloneUrl = new URL(this.basePathRoute);
    for (const param of Object.values(params)) {
      cloneUrl.pathname += `/${param}`;
    }
    for (const [key, value] of Object.entries(searchParams)) {
      cloneUrl.searchParams.set(key, value);
    }
    return cloneUrl;
  }

  async getAuthToken() {
    if (!auth.currentUser) throw new Error('Can`t get token when user is not authorized');
    const token = await auth.currentUser.getIdToken();
    return 'Bearer ' + token;
  }

  async createheadersObj({ requiredAuth, contentType }) {
    const headersObj = {};
    if (requiredAuth) headersObj.Authorization = await this.getAuthToken();
    if (contentType) headersObj['Content-Type'] = contentType;
    return headersObj;
  }

  createoptionsObj({ body, method }, headers, signal) {
    const optionsObj = { headers, method };
    if (method !== 'GET' && body) optionsObj.body = body;
    if (signal) optionsObj.signal = signal;
    return optionsObj;
  }

  async createRequest(
    body,
    { requiredAuth, method, contentType, params, searchParams, signal } = {
      requiredAuth: false,
      method: 'GET',
      params: {},
      searchParams: {},
    }
  ) {
    const headersObj = await this.createheadersObj({ requiredAuth, contentType });
    const headers = HeadersService.createHeaders(headersObj);
    const optionsObj = this.createoptionsObj({ body, method }, headers, signal);
    const url = this.withUrlParams(params, searchParams);
    return new Request(url, optionsObj);
  }
}
