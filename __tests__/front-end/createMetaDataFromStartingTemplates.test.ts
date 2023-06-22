import React, {useContext, useState} from 'react';
import { createMetaDataFromStartingTemplates } from "../../src/functions/metaData/createMetaDataFromStartingTemplates"
import {Templates, MetaData, MetaDataValue} from "../../src/types/types_copy";
import { Dispatch, SetStateAction } from "react";

describe('createMetaDataFromStartingTemplates', () => {
  let templates: Templates;
  let metaData: MetaData;
  let setMetaData: Dispatch<SetStateAction<MetaData>>;

  beforeEach(() => {
    // Create a mock setMetaData function
    setMetaData = jest.fn();

    // Initialize metaData
    metaData = new Map<string, MetaDataValue>();

    // Initialize templates. 
    templates = {
      template1: {
        section1: {
          script: ["sample script"],
          description: "sample description",
          start_pos: 0,
          title: "sample title"
        }
      }
    };
  });

  it('should create new MetaData objects from templates and update the metaData state', () => {
    const result = createMetaDataFromStartingTemplates(templates, metaData, setMetaData);

    // Check that the result is a Map and is not null
    expect(result).toBeInstanceOf(Map);
    expect(result).not.toBeNull();

    if (result) {
      // Check that the MetaData has been created for each template
      Object.keys(templates).forEach((templateKey) => {
        expect(result.get(templateKey)).toEqual({ title: templateKey, number: null });
      });

      // Check that setMetaData has been called with the new MetaData
      expect(setMetaData).toHaveBeenCalledWith(result);
    }
  });
});
