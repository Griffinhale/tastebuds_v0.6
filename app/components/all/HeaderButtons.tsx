"use client";
import React from "react";
import HeaderButtonSingle from "./HeaderButtonSingle";
import HeaderButtonDouble from "./HeaderButtonDouble";
import { useSelectedPage } from "../../context/SelectedPageContext";

const HeaderButtons = () => {
  const { selectedPage, setSelectedPage } = useSelectedPage();

  return (
    <div className="grid grid-flow-row grid-cols-2">
      <div className="col-span-1">
        <div className="row-span-2">
          <HeaderButtonDouble
            labelTop="Tastebuds"
            labelBottom="A Pairing Platform"
            isSelected={selectedPage === "home"}
            onClick={() => setSelectedPage("home")}
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Search"
            isSelected={selectedPage === "search"}
            onClick={() => setSelectedPage("search")}
          />
        </div>
      </div>

      <div className="col-span-1">
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Library"
            isSelected={selectedPage === "library"}
            onClick={() => setSelectedPage("library")}
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Platters"
            isSelected={selectedPage === "platters"}
            onClick={() => setSelectedPage("platters")}
          />
        </div>
        <div className="row-span-1">
          <HeaderButtonSingle
            label="Random" // or any other route
            isSelected={selectedPage === "random"}
            onClick={() => setSelectedPage("random")}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderButtons;