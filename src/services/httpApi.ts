const API_URL = process.env.REACT_APP_URL_API || '';

export const httpApi =
  (path: string) =>
  ({
    query,
    ...init
  }: RequestInit & {
    query?: {
      [key: string]: string;
    };
  }) => {
    let queryString = queryToString(query);
    return fetch(
      `${API_URL}/${path}${queryString}`,
      init
    );
  };

const queryToString = (query?: { [key: string]: string }) =>
  query
    ? '?' +
      Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    : '';
