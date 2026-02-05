import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const GRAPHQL_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://localhost:8080/graphql";

if (!process.env.NEXT_PUBLIC_WORDPRESS_API_URL) {
  console.warn("WARNING: NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local. Falling back to localhost.");
}

export const client = new ApolloClient({
  link: new HttpLink({
    uri: GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})

