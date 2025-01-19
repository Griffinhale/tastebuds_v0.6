"use client";

import React, { useState } from "react";
import LibraryCategoryContainer from "./LibraryCategoryContainer";
import LibraryItem from "./LibraryItem";

const CB_Library = () => {
  // Possible categories
  const categories = ["All", "Movie", "Album", "Game", "Book", "TV", "Platters"];

  // Track currently selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Example library data
  // In a real app, you might fetch from an API or context state
  const allItems = [
    {
      title: "Inception",
      category: "Movie",
      cover: "/covers/inception.jpg",
    },
    {
      title: "Dark Side of the Moon",
      category: "Album",
      cover: "/covers/dsotm.jpg",
    },
    {
      title: "Legend of Zelda",
      category: "Game",
      cover: "/covers/zelda.jpg",
    },
    {
      title: "Dune",
      category: "Book",
      cover: "/covers/dune.jpg",
    },
    {
      title: "Breaking Bad",
      category: "TV",
      cover: "/covers/breakingbad.jpg",
    },
    {
      title: "Weekend Brunch Platter",
      category: "Platters",
      cover: "/covers/platter.jpg",
    },
  ];

  // Filter items based on selectedCategory (unless it's "All")
  const filteredItems = selectedCategory === "All"
    ? allItems
    : allItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="p-4 md:p-6 lg:p-8 flex gap-6">
      {/* LEFT SIDEBAR: Categories */}
      <div className="w-1/4">
        <LibraryCategoryContainer
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {/* RIGHT CONTENT AREA: Grid of library items */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item, idx) => (
          <LibraryItem key={idx} title={item.title} cover={item.cover} />
        ))}
      </div>
    </div>
  );
};

export default CB_Library;