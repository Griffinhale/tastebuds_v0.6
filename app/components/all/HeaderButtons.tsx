"use client";
import React from "react";
import HeaderButtonSingle from "./HeaderButtonSingle";
import HeaderButtonDouble from "./HeaderButtonDouble";

const HeaderButtons = () => {

  return (
    <div className="grid grid-flow-row grid-cols-2">
      <div className="col-span-1">
        <div className="row-span-2">
          <HeaderButtonDouble
            labelTop="Tastebuds"
            labelBottom="A Pairing Platform"
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Search"
            ButtonDestination="/search"
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Library"
            ButtonDestination="/library"
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Platters"
            ButtonDestination="/platters"
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Random" // or any other route
            ButtonDestination="/random"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderButtons;