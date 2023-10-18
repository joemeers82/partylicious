import graphqlRequest from "../graphqlRequest";

export default async function homePageContent(offset) {
  const regularPostsQuery = {
    query: `query homePageContent {
      regularPosts: posts(first: 5) {
        edges {
          node {
            id
          }
        }
      }
      
    }`,
  };
  const regularPostsRes = await graphqlRequest(regularPostsQuery);

  const excludePostIds = regularPostsRes.data.regularPosts.edges.map(
    (post) => post.node.id
  );

  const query = {
    query: `query homePageContent($excludePostIds: [ID!]!) {
      stickyPosts: posts( where: {onlySticky: true}) {
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
    }`,
    variables: {
      excludePostIds,
    },
  };

  const res = await graphqlRequest(query);

  const frontPage = res.data.themeGeneralSettings.themeOptions;
  frontPage["stickyPost"] = res.data.stickyPosts.edges[0];
  frontPage["postListing"] = res.data.regularPosts.edges;

  return frontPage;
}
