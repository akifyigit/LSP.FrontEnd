import axios from 'axios';
import { API_URL } from 'constant/Varible';

const axiosParameterBuilder = (config) => {
  const { method = 'GET', headers = {}, data = {} } = config;

  // #region HEADERS
  const token = localStorage.getItem('clientToken');
  const headerParameters = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...headers,
  };

  // #endregion HEADERS
  // #region DATA
  let requestData = data;

  if (['POST', 'PATCH', 'PUT', 'DELETE'].includes(method)) {
    requestData = JSON.stringify(data);
  }
  // #endregion DATA

  return {
    data: requestData,
    headers: headerParameters,
    method,
  };
};

const apiURLBuilder = (params) => {
  const { baseUrl = API_URL, path = '' } = params;
  return `${baseUrl}/${path}`;
};

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: API_URL }) =>
  async (queryParams) => {
    try {
      const { path, ...rest } = queryParams;

      const params = axiosParameterBuilder(rest);
      const requestUrl = apiURLBuilder({ baseUrl, path });

      const parameters = {
        ...params,
        responseType: rest.download ? 'blob' : null,
      };

      const { data } = await axios(requestUrl, parameters);

      return { data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const apiResHandler = (
  promise,
  callback = () => {},
  failCallback = () => {}
) => {
  promise
    .then((res) => {
      const { data, error } = res;
      if (!data && error) {
        throw new Error(error?.data?.message || 'Something went wrong!');
      }
      const { data: responseData, message, status = true } = data || {};
      if (!status) {
        failCallback?.({ message });
      } else {
        callback?.(responseData);
      }
    })
    .catch((err) => {
      const { message } = err;
      failCallback?.({ message });
    });
};
