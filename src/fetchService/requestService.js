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

  getAuthToken() {
    if (!auth.currentUser) throw new Error('Can`t get token when user is not authorized');
    return 'Bearer ' + auth.currentUser.getIdToken();
  }

  createheadersObj({ requiredAuth, contentType }) {
    const headersObj = {};
    if (requiredAuth) headersObj.Authorization = this.getAuthToken();
    if (contentType) headersObj['Content-Type'] = contentType;
    return headersObj;
  }

  createoptionsObj({ body, method }, headers, signal) {
    const optionsObj = { headers, method };
    if (method !== 'GET' && body) optionsObj.body = body;
    if (signal) optionsObj.signal = signal;
    return optionsObj;
  }

  createRequest(
    body,
    { requiredAuth, method, contentType, params, searchParams, signal } = {
      requiredAuth: false,
      method: 'GET',
      params: {},
      searchParams: {},
    }
  ) {
    const headersObj = this.createheadersObj({ requiredAuth, contentType });
    const headers = HeadersService.createHeaders(headersObj);
    const optionsObj = this.createoptionsObj({ body, method }, headers, signal);
    const url = this.withUrlParams(params, searchParams);
    return new Request(url, optionsObj);
  }
}
