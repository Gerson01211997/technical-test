'use client';

import QueryProvider from 'providers/QueryProvider';
import { AuthProvider } from 'providers/AuthProvider';
import HeaderComponent from 'components/Header';
import type { ChildrenProviderProps } from './types';

export default function AppProviders({ children }: Readonly<ChildrenProviderProps>) {
  return (
    <QueryProvider>
      <AuthProvider>
        <HeaderComponent />
        {children}
      </AuthProvider>
    </QueryProvider>
  );
}
