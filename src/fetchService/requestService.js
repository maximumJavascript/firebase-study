import { HeadersService } from './headersService';
import { auth } from '../firebase-config';

/*
  params = 
  {
    userId: 1234
  }
*/

export class RequestService {
  constructor(basePathRoute) {
    // этакая защита
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

  createObjHeaders({ requiredAuth, content_type }) {
    const objHeaders = {};
    if (requiredAuth) objHeaders.Authorization = this.getAuthToken();
    if (content_type) objHeaders['Content-Type'] = content_type;
    return objHeaders;
  }

  createObjOptions({ body, method }, headers, signal) {
    const objOptions = { headers, method };
    if (method !== 'GET' && body) objOptions.body = body;
    if (signal) objOptions.signal = signal;
    return objOptions;
  }

  createRequest(
    body,
    { requiredAuth, method, content_type, params, route, signal } = {
      requiredAuth: false,
      method: 'GET',
      params: {},
    }
  ) {
    const objHeaders = this.createObjHeaders({ requiredAuth, content_type });
    const headers = HeadersService.createHeaders(objHeaders);
    const objOptions = this.createObjOptions({ body, method }, headers, signal);
    const url = this.withUrlParams(params, route);
    return new Request(url, objOptions);
  }
}
