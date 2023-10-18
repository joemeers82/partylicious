import FooterQuery from "../../../lib/queries/FooterQuery";

export default async function Footer() {
  const { data } = await FooterQuery();
  // console.log(data.menus.nodes[0].menuItems);
  return (
    <footer>
      <nav
        id="main-nav"
        className="w-full main-category-menu hidden md:block uppercase text-sm font-[400] tracking-wider
            "
      >
        <ul className="border  text-center">
          {data.menus.nodes[0].menuItems.edges.map((menuItem, i) => {
            return (
              <li
                key={menuItem.node.id}
                className="cursor-pointer inline-block transition ease-in-out  hover:text-lightBlue"
              >
                {menuItem.node.label}
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}
