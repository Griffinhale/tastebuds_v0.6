"use client";

import React from "react";
import HeaderButtonSingle from "./HeaderButtonSingle";

const HeaderUserInfo = () => {
  const handleLogout = () => {
    // Replace with your actual sign-out logic
    console.log("User logged out");
  };

  return (
    <div className="flex items-center space-x-3">
      {/* User Avatar (Placeholder) */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-white">
        JS
      </div>

      {/* User Name */}
      <div className="font-semibold text-slate-800">John Smith</div>

      {/* Log Out Button */}
      <HeaderButtonSingle
        label="Log Out"
        onClick={handleLogout}
        />
    </div>
  );
};

export default HeaderUserInfo;