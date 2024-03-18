import React from 'react';
import {TemplatesProvider} from '../context/TemplatesProvider'
import {PopupProvider} from '../context/PopupProvider';
import { AuthProvider } from '../context/AuthProvider';
import { SidebarProvider } from '../context/SidebarProvider';
import { ScreenProvider } from '../context/ScreenProvider';
import ErrorBoundary from './ErrorBoundary';
import App from './App';


export default function _App() {
  return (
    <ErrorBoundary>
        <AuthProvider>
          <ScreenProvider>
            <TemplatesProvider>
              <SidebarProvider>
                <PopupProvider>
                  <App />
                </PopupProvider>
              </SidebarProvider>
            </TemplatesProvider>
          </ScreenProvider>
        </AuthProvider>
    </ErrorBoundary>
  );
}