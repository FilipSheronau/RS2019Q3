export default class {
  constructor(url, parameters, headers) {
    this.url = url;
    this.parameters = parameters;
    this.headers = headers;
    this.data = null;
  }

  async getData() {
    try {
      const response = await fetch(`${this.url}${this.parametersToStr()}`, this.headers);
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
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
