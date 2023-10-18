import graphqlRequest from "../graphqlRequest";

export default async function HeaderQuery() {
  const headerQuery = {
    query: `
    query HeaderQuery {
        menus{
            nodes {
                name
                id
                slug
                menuItems {
                    edges {
                        node {
                            id
                            label
                            
                        }
                    }
                }
            }
        }
        
        themeGeneralSettings {
          themeOptions {
            headerImage {
              altText
              sourceUrl
              mediaDetails {
                sizes {
                  sourceUrl
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
  };

  const res = await graphqlRequest(headerQuery);
  if (res && res.data && res.data.menus && res.data.menus.nodes) {
    res.data.menus.nodes = res.data.menus.nodes.filter(
      (menu) => menu.slug !== "footer-menu"
    );
  }

  return res;
}
