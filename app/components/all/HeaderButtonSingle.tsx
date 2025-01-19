"use client";
import React from 'react';
import classNames from 'classnames'; // npm install classnames if not already installed

const HeaderButtonSingle = ({
  label = 'Button',
  isSelected = false,
  onClick = () => {},
}) => {
  // Base classes that always apply
  const baseClasses = `
    cursor-pointer 
    px-2 py-1 
    m-1 
    rounded-md 
    transition-colors 
    duration-200 
    border-0
  `;

  // Tailwind classes for when the button is not selected
  const unselectedClasses = `
    bg-white
    hover:border-x-2
    hover:border-black
    text-black
    hover:bg-[#007bbb]
    hover:text-white
  `;

  // Tailwind classes for when the button is selected
  const selectedClasses = `
    bg-[#047bff]
    text-white
  `;

  // Merge classes conditionally based on selected state
  const buttonClasses = classNames(
    baseClasses,
    isSelected ? selectedClasses : unselectedClasses
  );

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default HeaderButtonSingle;