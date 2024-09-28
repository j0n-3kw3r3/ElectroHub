import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {UserProvider} from './userContext';

export function Providers({children}) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      <UserProvider>{children}</UserProvider>
    </QueryClientProvider>
  );
}
