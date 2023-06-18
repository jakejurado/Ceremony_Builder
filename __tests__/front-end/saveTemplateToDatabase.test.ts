
import { saveTemplateToDatabase } from "../../src/functions/fetches/saveTemplateToDatabase";
import { MetaDataValue, MetaData, Templates, TemplatesWithContent, Template } from '../../src/types/types';
import { fetchCall } from "../../src/functions/fetches/api";
import fetchMock from 'jest-fetch-mock';
import React from 'react';


jest.mock("../../src/functions/fetches/api", () => ({
  fetchCall: {
    post: jest.fn(),
    put: jest.fn()
  }
}));

describe('saveTemplateToDatabase', () => {
  it('saves templates to the database correctly', async () => {
    const mockSetMetaData = jest.fn();

    const metaData: MetaData = new Map([["test", { title: "test", number: null }]]);

    const state: any = {
      "test": {
        order: [["section", 0]],
        section: {
          script: ["Hello, world!"],
          description: "Test description",
          start_pos: 0,
          title: "section"
        }
      }
    };

    // Note: You need to assert the function as a mocked function for TypeScript to recognize it as such
    (fetchCall.post as jest.Mock).mockResolvedValue({
      _id: 1,
      title: "test"
    });

    await saveTemplateToDatabase(1, metaData, mockSetMetaData, state);

    const expectedMetaData: MetaData = new Map([["test", { title: "test", number: 1 }]]);
    
    expect(mockSetMetaData).toHaveBeenCalledWith(expectedMetaData);
    expect(fetchCall.post).toHaveBeenCalledWith('templates', expect.any(Object));
  });
});
