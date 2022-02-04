import fetchMock from 'fetch-mock-jest';
import { httpApi } from './httpApi';

describe('httpApi', () => {
  test('url with query', async () => {
    fetchMock.get('/testing?test=TESTING', () => 200);
    await httpApi('testing')({
      method: 'GET',
      query: {
        test: 'TESTING',
      },
    });
    expect(fetchMock).toHaveLastFetched('/testing?test=TESTING', 'get');
  });
});
