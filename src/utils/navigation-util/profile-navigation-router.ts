import Icons from "@/themes/images/icons/icons"; // Assuming this is where the icons are imported

interface NavigationLinks {
  path: string;
  label: string;
}

export class ProfileNavigationClass {
  public navigationLinks: NavigationLinks[] = [
    { path: '/home/profile', label: 'Profile' },
    { path: '/home/settings', label: 'Settings' },
    { path: '/home/notifications', label: 'Notifications' },
    { path: '/home/Holidays', label: 'Holidays' },
    { path: '/home/Logout', label: 'Logout' },
  ];

  // Define a map from label to icon name
  private labelToIconMap: { [key: string]: keyof typeof Icons } = {
    Profile: "avatarIcon",
    Settings: "settings",
    Notifications: "bell",
    Holidays: "holiday",
    Logout: "logout",
  };

  /**
   * Navigates to the selected path based on the clicked menu item.
   *
   * @param {string} label - The label of the selected menu item.
   * @param {Function} navigate - Function to handle navigation.
   */
  public navigateTo(label: string, navigate: (path: string) => void) {
    const link = this.navigationLinks.find((link) => link.label === label);
    if (link) {
      navigate(link.path); // Navigate to the path associated with the label
    }
  }

  /**
   * Get the corresponding icon name for a menu item label.
   *
   * @param {string} label - The label of the menu item.
   * @returns {string} - The corresponding icon name.
   */
  public getIconForLabel(label: string): keyof typeof Icons {
    return this.labelToIconMap[label] || "defaultIcon"; // Use a default icon if the label is not found
  }
}
