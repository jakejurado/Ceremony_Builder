import { fetchCall } from '../../src/functions/fetches/api';
import { fetchUserTemplates } from '../../src/functions/fetches/fetchUserTemplates'
import { LoadUserTemplates, FetchUserTemplates } from '../../src/types/dispatch';
import { MetaDataValue, MetaData, Templates } from '../../src/types/types'
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe("fetchUserTemplates", () => {
  const mockDispatch = jest.fn();
  const mockSetMetaData = jest.fn();
  
  beforeEach(() => {
    fetchMock.resetMocks();
    mockDispatch.mockReset();
    mockSetMetaData.mockReset();
  });

  it("fetches user templates and dispatches them correctly", async () => {
    const mockUserId = 1;
    const mockMetaData: MetaData = new Map();
    const expectedResponse: FetchUserTemplates = [
      {
        title: "test",
        _id: 1,
        creator: 1,
        template: JSON.stringify({test: "test"}),
      },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));

    await fetchUserTemplates(mockUserId, mockMetaData, mockSetMetaData, mockDispatch);
    
    const expectedTemplates: Templates = {
      test: JSON.parse(expectedResponse[0].template),
    };
    const expectedMetaData: MetaData = new Map([["test", { title: "test", number: 1 }]]);
    
    expect(mockSetMetaData).toHaveBeenCalledWith(expectedMetaData);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "loadUserTemplates",
      payload: {
        userTemplates: expectedTemplates,
        setTitle: null,
      },
    });
  });
});
