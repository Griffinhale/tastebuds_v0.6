"use client";
import React from "react";
import TrendingSearches from "../homepage/TrendingSearches";
import PopularPlatters from "../homepage/PopularPlatters";
import Following from "../homepage/Following";

const CB_Homepage = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: 2 stacked boxes */}
        <div className="flex flex-col gap-6">
          <TrendingSearches />
          <PopularPlatters />
        </div>

        {/* Right Column: single box */}
        <div>
          <Following />
        </div>
      </div>
    </div>
  );
};

export default CB_Homepage;