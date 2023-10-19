"use client";
// import { ApolloWrapper } from "../../../lib/apollo/apollo-wrapper";
// import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";

import { gql, useSuspenseQuery } from "@apollo/client";

const QUERY = gql`
  query NewQuery($id: ID!) {
    webStory(id: $id) {
      content
      id
    }
  }
`;

export default function WebStory({ id }) {
  console.log(id);

  const { loading, error, data } = useSuspenseQuery(QUERY, {
    variables: { id },
  });
  if (error) {
    console.error("ApolloError:", error.message);
    return <div>Error: {error.message}</div>;
  }
  let content = data.webStory.content;
  let cleanContent = content.replace(/<p>/gs, "");
  cleanContent = cleanContent.replace(/<p>/gs, "");

  cleanContent = cleanContent.replace(/<\/p>/gs, "");

  console.log(cleanContent);

  // Your other logic and JSX here...

  //   return <div dangerouslySetInnerHTML={{ __html: cleanContent }}></div>;
  return <div>Party</div>;
}
