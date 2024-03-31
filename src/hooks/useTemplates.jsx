import React, {useContext} from 'react';
import { TemplatesContext } from '../context/TemplatesProvider';

export const useTemplates = () => {
  const context = useContext(TemplatesContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplatesContext');
  }
  return context;
};