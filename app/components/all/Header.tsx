"use client";
import React from "react";
import HeaderButtons from "./HeaderButtons";
import HeaderUserInfo from "./HeaderUserInfo";

const Header = () => {
  return (
    <div className="grid w-full grid-cols-3 gap-6 rounded-xl border-2 border-slate-950 bg-rose-200 px-6 py-4">
      {/* Navigation Panel */}
      <div className="col-span-2 flex items-center justify-center rounded-xl bg-neutral-400 p-2">
        <HeaderButtons />
      </div>

      {/* User Info Panel */}
      <div className="flex items-center justify-center rounded-xl bg-neutral-400 p-2">
        <HeaderUserInfo />
      </div>
    </div>
  );
};

export default Header;