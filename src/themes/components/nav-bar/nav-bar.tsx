import React from "react";
import styles from "./nav-bar.module.scss";
import Icons from "@/themes/images/icons/icons";
import NavBlock from "../nav-block/nav-block";

/**
 * A navigation bar component that includes a logo and a list of navigation blocks.
 *
 * @returns {JSX.Element} The rendered NavBar component.
 */
const NavBar = () => {
  return (
    <div className={styles.navBarWrapper}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <span>{Icons.workFriarLogo}</span> {/* Workfriar logo */}
        <h2>Workfriar</h2> {/* Company name */}
      </div>

      {/* Navigation List Section */}
      <div className={styles.navList}>
        {/* Dashboard Navigation Block */}
        <NavBlock
          title="DashBoard" // Title of the navigation block
          defaultIcon={Icons.dashboardOutline} // Default icon for dashboard
          activeIcon={Icons.dashboardFilled} // Active icon for dashboard
          activeStatus={false} // Active status of the block
          collapsaible={false} // Whether the block supports collapsing
        />

        {/* TimeSheet Navigation Block */}
        <NavBlock
          title="TimeSheet"
          defaultIcon={Icons.timeSheetOutline}
          activeIcon={Icons.timeSheetFilled}
          activeStatus={true}
          collapsaible={true}
        />

        {/* Projects Navigation Block */}
        <NavBlock
          title="Projects"
          defaultIcon={Icons.projectsOutline}
          activeIcon={Icons.projectsFilled}
          activeStatus={false}
          collapsaible={true}
        />

        {/* Organization Navigation Block */}
        <NavBlock
          title="Organization"
          defaultIcon={Icons.organizationOutline}
          activeIcon={Icons.organizationFilled}
          activeStatus={false}
          collapsaible={false}
        />

        {/* Project Forecast Navigation Block */}
        <NavBlock
          title="Project Forecast"
          defaultIcon={Icons.projectForeCastOutline}
          activeIcon={Icons.projectForeCastFilled}
          activeStatus={false}
          collapsaible={false}
        />

        {/* Reports Navigation Block */}
        <NavBlock
          title="Reports"
          defaultIcon={Icons.reportsOutline}
          activeIcon={Icons.reportsFilled}
          activeStatus={false}
          collapsaible={true}
        />
      </div>
    </div>
  );
};

export default NavBar;
