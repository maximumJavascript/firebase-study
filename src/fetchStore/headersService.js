export class HeadersService {
  static createHeaders(headersObj = {}) {
    const headers = new Headers();
    for (const [name, value] of Object.entries(headersObj)) {
      headers.set(name, value);
    }
    return headers;
  }
}
