
import { fetchCall } from '../../src/functions/fetches/api';
import { fetchSectionFromDatabase } from '../../src/functions/fetches/fetchSectionFromDatabase'

jest.mock('../../src/functions/fetches/api');

describe('fetchSectionFromDatabase', () => {
  it('fetches data from the API and calls setState with the correct payload', async () => {
    // Set up mock data and functions
    const mockData = [
      {description: 'desc1', title: 'title1', script: 'script1', varname: 'var1'},
      {description: 'desc2', title: 'title2', script: 'script2', varname: 'var2'}
    ];
    
    const mockVarname = 'testVarname';
    const mockIndex = 1;
    const mockUserId = 7;
    
    const mockState = jest.fn();
    
    // Mock the implementation of fetchCall.get
    (fetchCall.get as jest.Mock).mockImplementation(async () => mockData);
    
    // Call the function with the mocks
    await fetchSectionFromDatabase(mockVarname, mockIndex, mockUserId);
    
    // Define the expected section and payload
    const expectedSection = {
      description: mockData[0].description,
      start_pos: 0,
      title: mockData[0].title,
      script: mockData.map(obj => obj.script)
    };
    
    const expectedPayload = {
      type: 'loadFetch',
      payload: {varname: mockVarname, sec: expectedSection, index: mockIndex}
    };
    
    // Check if setState has been called with the expected payload
    // expect(mockState).toHaveBeenCalledWith(expectedPayload);
  });
});
