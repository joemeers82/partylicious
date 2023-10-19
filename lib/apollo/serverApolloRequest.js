import { getClient } from "./client";
import { gql } from "@apollo/client";

export default async function serverApolloRequest({
  query: queryString,
  variables = {},
}) {
  const query = gql`
    ${queryString}
  `; // Convert string to gql query

  const { data } = await getClient().query({
    query,
    variables,
    context: { fetchOptions: { next: { revalidate: 30 } } },
  });

  return data;
}
