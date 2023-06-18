import { fetchCall, BaseAPI } from '../../src/functions/fetches/api';
import fetchMock from 'jest-fetch-mock'; // This package needs to be installed for mocking fetch

fetchMock.enableMocks();

describe('BaseAPI', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('creates parameters string correctly', () => {
    const params = {
      key1: 'value1',
      key2: 'value2',
    };
    const result = fetchCall.createParams(params);
    expect(result).toBe('/?key1=value1&key2=value2');
  });

  it('GET method works correctly', async () => {
    const expectedData = { key: 'value' };
    fetchMock.mockResponseOnce(JSON.stringify(expectedData)); // Mock a fetch response

    const data = await fetchCall.get('login', { userId: 1, varname: 'value2' });
    expect(data).toEqual(expectedData);
  });

  it('POST method works correctly', async () => {
    const expectedData = { key: 'value' };
    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    const data = await fetchCall.post('signup', { username: 'testUser', password: 'testPassword' });
    expect(data).toEqual(expectedData);
  });

  it('PUT method works correctly', async () => {
    const expectedData = { key: 'value' };
    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    const data = await fetchCall.put('verify', { username: 'testUser', password: 'testPassword' });
    expect(data).toEqual(expectedData);
  });

  it('DELETE method works correctly', async () => {
    const expectedData = { key: 'value' };
    fetchMock.mockResponseOnce(JSON.stringify(expectedData));

    const data = await fetchCall.delete('signout', { username: 'testUser' });
    expect(data).toEqual(expectedData);
  });
});
