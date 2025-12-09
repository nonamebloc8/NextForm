'use client';
import React from 'react';
import { QueryClient, QueryClientProvider, QueryClientConfig } from '@tanstack/react-query';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,  // 2 minutes
    //   cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 1,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
