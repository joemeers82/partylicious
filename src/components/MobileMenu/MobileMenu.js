"use client";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "../SearchBar/SearchBar";
export default function MobileMenu({ menu }) {
  const [isMenuVisible, setMenuVisible] = useState(false);

  return (
    <>
      <div className=" mx-auto flex flex-col md:hidden text-center p-[20px] ">
        <div
          className="cursor-pointer mx-auto transition ease-in-out  hover:text-lightBlue flex items-center justify-between gap-3 "
          onClick={() => setMenuVisible(!isMenuVisible)}
        >
          <RxHamburgerMenu /> <span className="text-sm">Menu</span>
        </div>

        <ul
          className={`flex flex-col max-h-0 overflow-y-hidden items-center pr-[30px] gap-5 transition-max-height duration-500 ease-in-out ${
            isMenuVisible ? "max-h-[500px] h-fit " : "max-h-0"
          }`}
        >
          {menu.menuItems.edges.map((menuItem, i) => {
            return (
              <li
                key={menuItem.node.id}
                className={`cursor-pointer transition ease-in-out hover:text-lightBlue ${
                  i == 0 ? "mt-5" : ""
                }`}
              >
                {menuItem.node.label}
              </li>
            );
          })}
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
    </>
  );
}
