"use client";

import React, { useState } from "react";
import PlatterContainer from "../platters/PlatterContainer";
import PlatterCategoryContainer from "../platters/PlatterCategoryContainer";

interface Course {
  courseName: string;
  items: string[];
}

interface Platter {
  title: string;
  courses: Course[];
}

// Some example data, grouped by category.
// In a real app, you'd fetch from an API and filter by whether it contains itemTitle.
const allCategoryPlatters: Record<string, Platter[]> = {
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

interface Props {
  itemTitle: string; // The detail item for which we're displaying related platters
}

const DetailPlatterContainer: React.FC<Props> = ({ itemTitle }) => {
  const [selectedCategory, setSelectedCategory] = useState("Mine");
  
  // We'll pretend this array is filtered to only show platters containing `itemTitle`.
  // For demo, just showing the entire array for whichever category is selected.
  const currentPlatters = allCategoryPlatters[selectedCategory] || [];

  const categories = ["Mine", "Saved", "Popular", "Random"];

  return (
    <div className="rounded-xl border-2 border-slate-900 bg-white p-4">
      <h2 className="mb-3 text-lg font-semibold">Platters Containing: {itemTitle}</h2>
      
      {/* Category Sidebar + Platter Grid */}
      <div className="flex gap-4">
        {/* LEFT SIDEBAR: Category selection */}
        <div className="w-1/4">
          <PlatterCategoryContainer
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* RIGHT: Platter containers */}
        <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentPlatters.map((platter, idx) => (
            <PlatterContainer key={idx} platter={platter} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPlatterContainer;
