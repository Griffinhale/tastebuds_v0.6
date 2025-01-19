"use client";

import React, { useState } from "react";
import SearchFilterContainer from "./SearchFilterContainer";
import SearchItemContainer from "./SearchItemContainer";
import SearchContainerPopup from "./SearchContainerPopup";

const CB_Search = () => {
  // The user’s typed search term
  const [searchTerm, setSearchTerm] = useState("");

  // Whether the popup is open and which item is selected
  const [selectedItem, setSelectedItem] = useState<unknown>(null);

  // Example data: each “column” can represent a different filter combination
  // In a real app, this might come from an API or be computed from filters
  const fakeColumns = [
    {
      title: "Music Results",
      items: ["Song A", "Song B", "Song C", "Song D"],
    },
    {
      title: "Movie Results",
      items: ["Movie X", "Movie Y", "Movie Z"],
    },
    {
      title: "Food Pairings",
      items: ["Pasta & Wine", "Cheese & Crackers", "Ice Cream & Brownies"],
    },
    // Add as many columns as you need
  ];

  // Handle clicking on a search item
  const handleItemClick = (item: string) => {
    setSelectedItem(item); // open the popup
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* SEARCH INPUT + FILTERS */}
      <div className="mb-4 flex flex-col gap-4">
        {/* Search Term Input */}
        <input
          type="text"
          placeholder="Search term here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md rounded border-2 border-slate-300 p-2 focus:outline-none focus:border-blue-500"
        />

        {/* Filter Container (expandable) */}
        <SearchFilterContainer />
      </div>

      {/* SEARCH RESULTS: Dynamic columns based on filter/data */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {fakeColumns.map((col, idx) => (
          <SearchItemContainer
            key={idx}
            title={col.title}
            items={col.items}
            onItemClick={handleItemClick}
          />
        ))}
      </div>

      {/* Popup for a selected item */}
      {selectedItem && (
        <SearchContainerPopup item={selectedItem} onClose={closePopup} />
      )}
    </div>
  );
};

export default CB_Search;