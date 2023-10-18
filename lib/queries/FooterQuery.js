import graphqlRequest from "../graphqlRequest";

export default async function FooterQuery() {
  const footerQuery = {
    query: `
    query FooterQuery {
        menus(where:{slug:"footer-menu"}){
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
        
      }
    `,
  };

  const res = await graphqlRequest(footerQuery);
  if (res && res.data && res.data.menus && res.data.menus.nodes) {
    return res;
  }
}
