import graphqlRequest from "../graphqlRequest";
import serverApolloRequest from "../apollo/serverApolloRequest";

export default async function homePageContent(offset) {
  const regularPostsQuery = `query homePageContent {
      regularPosts: posts(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      
    }`;

  const regularPostsRes = await serverApolloRequest({
    query: regularPostsQuery,
  });
  const excludePostIds = regularPostsRes.regularPosts.edges.map(
    (post) => post.node.id
  );

  const queryString = `query homePageContent($excludePostIds: [ID!]!) {
    stickyPosts: posts(where: {onlySticky: true}) {
      edges {
        node {
          isSticky
          title
          excerpt
          id
          categories {
            edges {
              node {
                id
                name
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
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
          slug
        }
      }
    }
    regularPosts: posts(first: 5) {
      edges {
        node {
          title
          excerpt
          id
          categories {
            edges {
              node {
                id
                name
              }
            }
          }
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
          slug
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
                sizes {
                  sourceUrl
                  width
                  height
                  file
                }
              }
              sourceUrl
            }
          }
        }
      }
    }
    themeGeneralSettings {
      themeOptions {
        frontPageTopPosts {
          post {
            ... on Post {
              id
              featuredImage {
                node {
                  sourceUrl
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
              slug
              title
            }
          }
        }
        frontPageCategorySections {
          offset
          title
          category {
            id
            slug
            posts(first: 6, where: {notIn: $excludePostIds}) {
              nodes {
                title
                id
                slug
                excerpt
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
      }
    }
  }`;

  const res = await serverApolloRequest({
    query: queryString,
    variables: { excludePostIds },
  });

  const frontPage = {
    ...res.themeGeneralSettings.themeOptions,
    stickyPost: res.stickyPosts.edges[0],
    postListing: res.regularPosts.edges,
  };
  return frontPage;
}
