"use client";
import React from 'react';
import classNames from 'classnames'; // npm install classnames if not already installed
import Link from 'next/link';

const HeaderButtonSingle = ({
  label = 'Button',
  isSelected = false,
  onClick = () => {},
  ButtonDestination = "/home"
}) => {
  // Base classes that always apply
  const baseClasses = `
    cursor-pointer 
    px-2 py-1 
    mx-2 my-1 
    rounded-md 
    transition-colors 
    duration-200 
    text-sm 
    border-0
  `;

  // Tailwind classes for when the button is not selected
  const unselectedClasses = `
    bg-white
    hover:border-x-2
    hover:text-xs
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
    <Link href={ButtonDestination}>
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
    >
      {label}
    </button>
    </Link>
  );
};

export default HeaderButtonSingle;