"use client";

import React from "react";

interface Props {
  item: string; // or a more complex object
  onClose: () => void;
}

const SearchContainerPopup: React.FC<Props> = ({ item, onClose }) => {
  return (
    // Full-screen overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      {/* Popup content */}
      <div className="w-full max-w-lg rounded-lg bg-white p-4 shadow-lg">
        <h2 className="mb-2 text-xl font-bold">Search Item Details</h2>
        <p className="mb-4">You clicked on: <strong>{item}</strong></p>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchContainerPopup;