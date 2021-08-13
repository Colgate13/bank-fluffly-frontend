// eslint-disable-next-line no-use-before-define
import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

// eslint-disable-next-line react/prop-types
const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
