export class HeadersService {
  static createHeaders(objHeaders = {}) {
    const headers = new Headers();
    for (const [name, value] of Object.entries(objHeaders)) {
      headers.set(name, value);
    }
    return headers;
  }
}
