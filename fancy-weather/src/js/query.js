export default class Query {
  constructor(url, parameters) {
    this.url = url;
    this.parameters = parameters;
    this.data = null;
  }

  async getQuery() {
    try {
      const response = await fetch(`${this.url}${this.parametersToStr()}`);
      if (response.ok) {
        const data = await response.json();
        this.data = data;
        this.returnResponse(data);
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      throw new Error(err);
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

  returnResponse() {
    return this.data;
  }
}
