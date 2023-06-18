
import { fetchCall } from '../../src/functions/fetches/api'
import { checkCookieForAccess } from '../../src/functions/fetches/checkUserAccess'

jest.mock('../../src/functions/fetches/api', () => ({
  fetchCall: {
    get: jest.fn(),
  },
}));

describe('checkCookieForAccess', () => {
  it('calls setCurrUser with userId when cookie is authorized', async () => {
    const mockCookie = { authorized: true, userId: '123' };
    (fetchCall.get as jest.Mock).mockResolvedValue(mockCookie); // mock the return value of fetchCall.get

    const setCurrUser = jest.fn(); // mock setCurrUser function

    await checkCookieForAccess(setCurrUser);

    expect(setCurrUser).toHaveBeenCalledWith(mockCookie.userId);
  });

  it('does not call setCurrUser when cookie is not authorized', async () => {
    const mockCookie = { authorized: false, userId: '123' };
    (fetchCall.get as jest.Mock).mockResolvedValue(mockCookie); // mock the return value of fetchCall.get

    const setCurrUser = jest.fn(); // mock setCurrUser function

    await checkCookieForAccess(setCurrUser);

    expect(setCurrUser).not.toHaveBeenCalled();
  });
});
