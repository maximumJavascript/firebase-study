import { HeadersService } from './headersService';
import { auth } from '../firebase-config';

export class RequestService {
  constructor(basePathRoute) {
    this.basePathRoute = new URL(basePathRoute);
  }

  withUrlParams(params, route) {
    const cloneUrl = new URL(this.basePathRoute);
    if (route) cloneUrl.pathname = route;
    for (const param of Object.values(params)) {
      cloneUrl.pathname += `/${param}`;
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
    { requiredAuth, method, contentType, params, route, signal } = {
      requiredAuth: false,
      method: 'GET',
      params: {},
    }
  ) {
    const headersObj = this.createheadersObj({ requiredAuth, contentType });
    const headers = HeadersService.createHeaders(headersObj);
    const optionsObj = this.createoptionsObj({ body, method }, headers, signal);
    const url = this.withUrlParams(params, route);
    return new Request(url, optionsObj);
  }
}
