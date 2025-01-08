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
  const [selectedDropdownPath, setSelectedDropdownPath] = useState<string | null>(null);


  const handleMainNavClick = (path: string) => {
    setSelectedDropdownPath(path);
    navBarNavigation.navigateTo(path, router.push);
  };

  const handleDropdownClick = (path: string) => {
    navBarNavigation.navigateTo(path, router.push);
    setSelectedDropdownPath(null);
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
              onClickFunction={() => handleMainNavClick(link.path)}
              isDropdownSelected={selectedDropdownPath === link.path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
