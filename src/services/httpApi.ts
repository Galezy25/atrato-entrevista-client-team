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
      `${process.env.REACT_APP_URL_API}/${path}${queryString}`,
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
