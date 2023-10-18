import HeaderQuery from "../../lib/queries/HeaderQuery";
import Link from "next/link";
import SocialMenu from "./SocialMenu/SocialMenu";

import MobileMenu from "./MobileMenu/MobileMenu";
import SearchBar from "./SearchBar/SearchBar";

export default async function Header() {
  const { data } = await HeaderQuery();
  const menu = (name) => {
    return data.menus.nodes.find((obj) => obj.slug === name);
  };

  const bgImage = data.themeGeneralSettings.themeOptions.headerImage;

  const backgroundImageStyle = {
    backgroundImage: `url(${bgImage.sourceUrl})`,
  };
  return (
    <header>
      <div>
        <div className="border-b">
          <MobileMenu menu={menu("mobile-header-menu")} />

          <div className="max-w-7xl mx-auto sm:block md:flex w-full sm:text-center md:text-left p-[20px] hidden md:block">
            <nav
              id="main-nav"
              className="w-full main-category-menu  uppercase text-sm font-[400] tracking-wider
                "
            >
              <ul className="flex h-full items-center pr-[30px] gap-5">
                {menu("navigation-menu").menuItems.edges.map((menuItem, i) => {
                  return (
                    <li
                      key={menuItem.node.id}
                      className="cursor-pointer transition ease-in-out  hover:text-lightBlue"
                    >
                      {menuItem.node.label}
                    </li>
                  );
                })}
              </ul>
            </nav>
            <SocialMenu />
            <SearchBar />
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:block md:flex w-full sm:text-center md:text-left">
          <Link href="/" className="h-[130px] w-[500px]">
            <h1
              style={backgroundImageStyle}
              className="w-full bg-contain md:bg-left bg-center bg-no-repeat text-transparent h-[130px] w-[500px]"
            >
              Partylicious
            </h1>
          </Link>
          <nav
            id="main-nav"
            className="w-full main-category-menu hidden md:block uppercase text-sm font-[400] tracking-wider
            "
          >
            <ul className="flex h-full justify-end items-center pr-[30px] gap-5">
              {menu("recipe-category-menu").menuItems.edges.map(
                (menuItem, i) => {
                  return (
                    <li
                      key={menuItem.node.id}
                      className="cursor-pointer transition ease-in-out  hover:text-lightBlue"
                    >
                      {menuItem.node.label}
                    </li>
                  );
                }
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
