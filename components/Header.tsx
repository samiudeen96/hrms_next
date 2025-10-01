"use client";

import { useMe } from "@/hooks/authHook";
import React, { useEffect, useRef, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import GlobalLoader from "./GlobalLoader";
import useUiStore from "@/stores/uiStore";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { headerDropdown, menu, MenuItem } from "@/utils/contant";
import iconMap from "@/utils/icon";
import { MdOutlineLogout } from "react-icons/md";
import { logoutFn } from "@/app/api/services/userService";
import { usePathname, useRouter } from "next/navigation";
import ActionModal from "./ActionModel";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: profile, isLoading } = useMe();
  const user = profile?.user;
  const role = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
    : "";

  const { isSidebarOpen, openSidebar, openModal, isModalOpen } = useUiStore();
  const pathname = usePathname();
  const router = useRouter();

  // Determine menu based on role
  const userRole = user?.role?.toLowerCase() as keyof typeof menu;
  const filteredMenu: MenuItem[] = headerDropdown[userRole] || [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    openModal({
      desc: "Are you sure you want to logout?",
      buttonName: "Logout",
      color: "bg-primary",
      actionType: "logout",
      onConfirm: async () => {
        try {
          await logoutFn();
          router.push("/login"); // ✅ use router.push instead of redirect()
        } catch (error) {
          console.error("Logout failed", error);
        }
      },
    });
  };

  return (
    <div className="h-15 flex sm:justify-end justify-between items-center py-2 px-4">
      {/* Mobile menu button */}
      <div className="sm:hidden" onClick={() => openSidebar(true)}>
        <BiMenuAltLeft className="w-8 h-8" />
      </div>

      {/* Profile dropdown */}
      <div
        onClick={toggleDropdown}
        ref={dropdownRef}
        className="flex items-center gap-2 border border-[#eae7f9] rounded p-1 cursor-pointer relative"
      >
        <div className="bg-background w-8 h-8 flex items-center justify-center rounded">
          <FaUser />
        </div>

        <div>
          <p className="text-xs font-semibold mb-[-1px]">{user?.firstName}</p>
          <p className="text-[10px]">{role}</p>
        </div>

        <IoIosArrowDown
          className={`w-3 h-3 ml-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded z-50">
            <ul className="text-sm p-1">
              {filteredMenu.map((item, index) => {
                const isActive = item.path === pathname;
                const Icon = item.icon ? iconMap[item.icon] : null;

                return (
                  <Link
                    href={item.path ?? "#"}
                    key={index}
                    className={`p-2 flex items-center gap-2 transition 
                      ${
                        isActive
                          ? "border-l-4 border-primary bg-[#eae7f9] text-primary"
                          : "border-l-4 border-white hover:bg-[#eae7f9] hover:text-primary hover:border-primary"
                      } `}
                  >
                    <div className="bg-white rounded-sm p-1">
                      {Icon && <Icon className="w-5 h-5 text-primary" />}
                    </div>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div
                onClick={handleLogout}
                className="p-2 flex items-center gap-2 border-l-4 border-white hover:bg-[#eae7f9] hover:text-primary hover:border-primary cursor-pointer"
              >
                <div className="bg-white rounded-sm p-1">
                  <MdOutlineLogout className="w-5 h-5 text-primary" />
                </div>
                <span>Logout</span>
              </div>
            </ul>
          </div>
        )}
      </div>

      {/* Loader */}
      {isLoading && <GlobalLoader />}
      {isModalOpen && <ActionModal />}

      {/* Mobile Sidebar */}
      <div
        className={`fixed sm:hidden inset-0 z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "bg-black/40" : "pointer-events-none opacity-0"
        }`}
        onClick={() => openSidebar(false)}
      >
        <div
          className={`fixed top-0 left-0 h-full w-64 transition-transform duration-300 ease-in-out transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;
