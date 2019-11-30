export default class Query {
  constructor(url, parameters, headers) {
    this.url = url;
    this.parameters = parameters;
    this.headers = headers;
    this.data = null;
  }

  async getData() {
    let result;
    try {
      const response = await fetch(`${this.url}${this.parametersToStr()}`, this.headers);
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      result = data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    return result;
  }

  parametersToStr() {
    let result = '';
    Object.entries(this.parameters).forEach(([key, val]) => {
      if (result.length < 1) {
        result = '?';
      } else {
        result = `${result}&`;
      }
      result = `${result}${key}=${val}`;
    });
    return result;
  }
}
