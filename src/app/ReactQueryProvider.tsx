"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

// DEVELOPMENT모드일때 networkMode: always
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: process.env.NODE_ENV === "development" ? "always" : "online", // online is default
    },
  },
});
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
