"use client";
import React from "react";
import { useRouter } from "next/navigation"; // Using useRouter from next/navigation
import { usePathname } from "next/navigation"; // To get the current pathname
import styles from "./nav-bar.module.scss";
import Icons from "@/themes/images/icons/icons"; // Importing icons
import NavBlock from "../nav-block/nav-block";
import { NavBarNavigationClass } from "@/utils/navigation-util/page-navigation-router"; // Import the navigation class

/**
 * A navigation bar component that includes a logo and a list of navigation blocks.
 *
 * @returns {JSX.Element} The rendered NavBar component.
 */
const NavBar = () => {
  const router = useRouter(); // Get router instance for navigation from next/navigation
  const pathname = usePathname(); // Get the current path to determine active status
  const navBarNavigation = new NavBarNavigationClass(); // Create an instance of the navigation class

  const handleNavClick = (path: string) => {
    navBarNavigation.navigateTo(path, router.push); // Call navigateTo and pass the router.push method
  };

  return (
    <div className={styles.navBarWrapper}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <span>{Icons.workFriarLogo}</span> {/* Workfriar logo */}
        <h2>Workfriar</h2> {/* Company name */}
      </div>

      {/* Navigation List Section */}
      <div className={styles.navList}>
        {navBarNavigation.navigationLinks.map((link) => {
          const DefaultIcon = Icons[link.defaultIcon]; // Get the default icon based on the icon name
          const ActiveIcon = Icons[link.activeIcon]; // Get the active icon based on the icon name

          return (
            <NavBlock
              key={link.label}
              title={link.label}
              defaultIcon={DefaultIcon} // Pass the corresponding default icon to the NavBlock
              activeIcon={ActiveIcon} // Pass the corresponding active icon to the NavBlock
              activeStatus={navBarNavigation.getActiveStatus(link.path, pathname)} // Set active status based on the current pathname
              collapsible={link.collapsible}
              onClickFunction={() => handleNavClick(link.path)} // Call handleNavClick when a nav block is clicked
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
