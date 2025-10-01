"use client";

import { menu, MenuItem } from "@/utils/contant";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import iconMap from "@/utils/icon";
import { useMe } from "@/hooks/authHook";
import useUiStore from "@/stores/uiStore";

const Sidebar: React.FC = () => {
  const { data: profile } = useMe();

  // Example: you can select role dynamically if needed
  const userRole: keyof typeof menu = profile?.user.role.toLowerCase(); // change this dynamically based on profile

  const filteredMenu: MenuItem[] = menu[userRole] || [];
  const pathname = usePathname();

  const { openSidebar } = useUiStore();

  return (
    <div className="bg-white h-full">
      <div className="h-15 flex items-center justify-center font-bold">Logo</div>
      <div className="px-6 pb-6 flex flex-col gap-2">
        {filteredMenu.map((item, index) => {
          const Icon = item.icon ? iconMap[item.icon] : null;

          return (
            <Link
              href={item.path}
              
              key={index}
              onClick={()=>openSidebar(false)}
              className={`p-2 flex items-center gap-2 ${
                pathname === item.path
                  ? "border-l-4 border-primary bg-[#eae7f9] text-primary"
                  : "border-l-4 border-white"
              }`}
            >
              <div className="bg-white rounded-sm p-1">
                {Icon && <Icon className="w-5 h-5 text-primary" />}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;


