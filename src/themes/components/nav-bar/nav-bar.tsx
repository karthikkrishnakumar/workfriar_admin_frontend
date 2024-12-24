"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./nav-bar.module.scss";
import Icons from "@/themes/images/icons/icons";
import NavBlock from "../nav-block/nav-block";
import { NavBarNavigationClass } from "@/utils/navigation-util/page-navigation-router";
import {
  getDropdownItems,
  isCollapsibleItem,
} from "@/utils/nav-dropdown-menu/nav-dropdown-menu";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const navBarNavigation = new NavBarNavigationClass();
  const [dropdownSelected, setDropdownSelected] = useState(false);

  const handleNavClick = (path: string) => {
    setDropdownSelected(false); // Reset dropdown selection when clicking main nav items
    navBarNavigation.navigateTo(path, router.push);
  };

  const handleDropdownClick = (path: string) => {
    setDropdownSelected(true); // Set dropdown selection when clicking dropdown items
    window.location.href = path;
  };

  return (
    <div className={styles.navBarWrapper}>
      <div className={styles.logo}>
        <span>{Icons.workFriarLogo}</span>
        <h2>Workfriar</h2>
      </div>

      <div className={styles.navList}>
        {navBarNavigation.navigationLinks.map((link) => {
          const DefaultIcon = Icons[link.defaultIcon];
          const ActiveIcon = Icons[link.activeIcon];
          const isCollapsible = isCollapsibleItem(link.label);
          const dropdownItems = getDropdownItems(link.label)?.map((item) => ({
            ...item,
            onClick: () => handleDropdownClick(item.path),
          }));

          return (
            <NavBlock
              key={link.label}
              title={link.label}
              defaultIcon={DefaultIcon}
              activeIcon={ActiveIcon}
              activeStatus={navBarNavigation.getActiveStatus(
                link.path,
                pathname
              )}
              collapsible={isCollapsible}
              dropdownItems={dropdownItems}
              onClickFunction={() => handleNavClick(link.path)}
              isDropdownSelected={dropdownSelected} // Pass the dropdown selection state
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
