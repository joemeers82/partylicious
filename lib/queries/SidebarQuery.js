import graphqlRequest from "../graphqlRequest";
export async function getSidebar() {
  const query = {
    query: `
            query getWebStories {
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
                                            file,
                                            sourceUrl,
                                            width,
                                            height
                                        },
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
                        aboutMeSection {
                            aboutMe
                          }
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
                }
        `,
  };
  const res = await graphqlRequest(query);

  const sideBar = res.data;

  return sideBar;
}
