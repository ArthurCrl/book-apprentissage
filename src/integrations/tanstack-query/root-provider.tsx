import { QueryClient } from '@tanstack/react-query'
import type { ReactNode } from 'react'

let clientQueryClient: QueryClient | undefined

export function getQueryClient() {
  if (!clientQueryClient) {
    clientQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
        },
      },
    })
  }
  return clientQueryClient
}

export function getContext() {
  return {
    queryClient: getQueryClient(),
  }
}

export default function TanstackQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
