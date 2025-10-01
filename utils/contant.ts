// ==========================
// contant.ts

import iconMap from "./icon";

// ==========================
export type MenuItem = {
  label: string;
  path?: string;
  action?: string;
  icon?: keyof typeof iconMap;
};

export type Menu = {
  admin: MenuItem[];
  hr: MenuItem[];
  employee: MenuItem[];
};

export const menu: Menu = {
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Users", path: "/users", icon: "users" },
    { label: "Settings", path: "/settings", icon: "settings" },
  ],
  hr: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Settings", path: "/settings", icon: "settings" },
  ],
  employee: [
    { label: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { label: "Settings", path: "/settings", icon: "settings" },
  ],
};

export const headerDropdown: Menu = {
  admin: [
    {
      label: "Profile",
      path: "",
      icon: "user",
    },
    // {
    //   label: "Logout",
    //   action: "logout",
    //   icon: "logout",
    // },
  ],
    hr: [
    {
      label: "Profile",
      path: "",
      icon: "user",
    },
    // {
    //   label: "Logout",
    //   action: "logout",
    //   icon: "logout",
    // },
  ],
    employee: [
    {
      label: "Profile",
      path: "",
      icon: "user",
    },
    // {
    //   label: "Logout",
    //   action: "logout",
    //   icon: "logout",
    // },
  ],
};
