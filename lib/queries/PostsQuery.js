import graphqlRequest from "../graphqlRequest";

// export async function getPostSlugs() {
//   const query = {
//     query: `query getPostSlugs {
//           posts(first: 1000) {
//             nodes {
//               slug
//             }
//           }
//           pages{
//               nodes {
//                   slug
//                 }
//           }
//         }`,
//   };

//   const res = await graphqlRequest(query);
//   const slugs = res.data.pages.nodes.concat(res.data.posts.nodes);
//   return slugs;
// }

export async function getSinglePost(slug) {
  const query = {
    query: `query getSinglePost {
                  post(id: "${slug}", idType: SLUG) {
                      content(format: RENDERED)
                      excerpt(format: RENDERED)
                      date
                      modified
                      slug
                      title(format: RENDERED)
                      databaseId
                      comments {
                        edges {
                          node {
                            id
                          }
                        }
                        nodes {
                          author {
                            node {
                              name
                            }
                          }
                          content
                        }
  
                      }
                      featuredImage {
                          node {
                              mediaDetails {
                                  sizes {
                                      height
                                      width
                                      sourceUrl
                                  }
                              }
                          }
                      }
                      categories {
                          nodes {
                              name
                              slug
                          }
                      }
                      
                  }
                  page(id: "${slug}", idType: URI) {
                      content(format: RENDERED)
                      title(format: RENDERED)
                      slug
                      date
                      featuredImage {
                        node {
                          mediaDetails {
                            sizes {
                              height
                              width
                              sourceUrl
                            }
                          }
                        }
                      }
                  }
                  webStories(first: 5) {
                      edges {
                          node {
                              slug
                              id
                              title(format: RENDERED)
                              featuredImage {
                                  node {
                                      mediaDetails {
                                          height
                                          width
                                      }
                                      sourceUrl
                                  }
                              }
                          }
                      }
                  }
                  themeGeneralSettings {
                      themeOptions {
                          sidebarRecipesCategory {
                              name
                              posts(first:3) {
                                  edges {
                                      node {
                                          id
                                          title
                                          slug
                                          featuredImage {
                                              node {
                                                  altText
                                                  mediaDetails {
                                                      sizes {
                                                          width
                                                          height
                                                          sourceUrl
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                          sidebarPopularPosts {
                              ... on Post {
                                  id
                                  title
                                  slug
                                  featuredImage {
                                      node {
                                          altText
                                          mediaDetails {
                                              sizes {
                                                  width
                                                  height
                                                  sourceUrl
                                              }
                                          }
                                      }
                                  }
                              }
                          }
                      }   
                  }
              }`,
  };
  const res = await graphqlRequest(query);

  const singlePost = res.data;

  return singlePost;
}
