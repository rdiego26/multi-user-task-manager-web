const BASE_URL = 'http://localhost:3000/api';

type Options = RequestInit | { headers: Record<string, string> }

const doRequest = (method: string) =>
  async <RequestData, Response>(
    url: string,
    data?: RequestData,
    options: Options = {} ,
  ) => {
    try {
      const body = typeof data === 'object' && Object.keys(data).length > 0 ? JSON.stringify(data) : undefined;
      const response = await fetch(
        BASE_URL + url,
        {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          ...options,
          body,
        }
      );

      const statusCode: number = response.status;
      const statusString: string = response.statusText;

      if ([400, 401, 500].includes(statusCode)) {
        alert(statusString);
        return;
      }

      const result: Response = await response.json();
      return result;
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

export const get = doRequest('GET');
export const post = doRequest('POST');
export const put = doRequest('PUT');
export const patch = doRequest('PATCH');
export const remove = doRequest('DELETE');
