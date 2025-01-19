"use client";

import React, { useState } from "react";
import PlatterCategoryContainer from "./PlatterCategoryContainer";
import PlatterContainer from "./PlatterContainer";

const CB_Platters = () => {
  // Categories (could come from an API or be hardcoded)
  const categories = ["Mine", "Saved", "Popular", "Random"];
  // Track the currently selected category
  const [selectedCategory, setSelectedCategory] = useState("Mine");

  // Example platter data, grouped by category
  // Each “platter” could have multiple “courses,” each with “items.”
  // This is purely placeholder. In a real app, fetch from server or pass as props.
  const allPlatters = {
    Mine: [
      {
        title: "My Brunch Platter",
        courses: [
          { courseName: "Course 1", items: ["Avocado Toast", "Mimosa"] },
          { courseName: "Course 2", items: ["Fruit Salad", "Greek Yogurt"] },
        ],
      },
      {
        title: "My Dinner Platter",
        courses: [
          { courseName: "Course 1", items: ["Steak", "Mashed Potatoes"] },
          { courseName: "Course 2", items: ["Red Wine", "Green Salad"] },
        ],
      },
    ],
    Saved: [
      {
        title: "Cozy Winter Dishes",
        courses: [
          { courseName: "Main", items: ["Spaghetti & Meatballs"] },
          { courseName: "Dessert", items: ["Hot Chocolate", "Brownies"] },
        ],
      },
    ],
    Popular: [
      {
        title: "Top Rated Breakfast",
        courses: [
          { courseName: "Course 1", items: ["Pancakes", "Omelette"] },
          { courseName: "Course 2", items: ["Orange Juice", "Coffee"] },
        ],
      },
      {
        title: "Community Favorites",
        courses: [
          { courseName: "Main", items: ["Ramen", "Fried Chicken"] },
          { courseName: "Dessert", items: ["Cheesecake"] },
        ],
      },
    ],
    Random: [
      {
        title: "Random Mix #1",
        courses: [
          { courseName: "Everything Bagel", items: ["Bagel", "Lox", "Cream Cheese"] },
          { courseName: "Bonus Bites", items: ["Chips", "Guacamole"] },
        ],
      },
    ],
  };

  // Platter list for the currently selected category
  const currentPlatters = allPlatters[selectedCategory] || [];

  return (
    <div className="p-4 md:p-6 lg:p-8 flex gap-6">
      {/* LEFT SIDEBAR: Categories */}
      <div className="w-1/4">
        <PlatterCategoryContainer
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
      </div>

      {/* RIGHT CONTENT AREA: Multiple PlatterContainers */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {currentPlatters.map((platter, idx) => (
          <PlatterContainer key={idx} platter={platter} />
        ))}
      </div>
    </div>
  );
};

export default CB_Platters;