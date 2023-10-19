"use client";

import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const url = `${process.env.NEXT_PUBLIC_SITE_URL}/graphql`;

function makeClient() {
  // const url = `https://wordpress-313234-3636600.cloudwaysapps.com/graphql`;
  console.log(url);
  const httpLink = new HttpLink({
    uri: "https://wordpress-313234-3636600.cloudwaysapps.com/graphql",
  });
  console.log(httpLink);
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
