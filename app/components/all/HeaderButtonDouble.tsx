"use client";
import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

const HeaderButtonDouble = ({
  labelTop = 'Top Label',
  labelBottom = 'Bottom Label',
  isSelected = false,
  onClick = () => {},
  ButtonDestination = "/"
}) => {
  // Base classes that always apply
  const baseClasses = `
    cursor-pointer 
    px-3 py-2 
    my-1 mx-2 
    rounded-md 
    transition-colors 
    duration-200 
    flex flex-col 
    items-center 
  `;

  // Classes for the unselected state (includes hover)
  const unselectedClasses = `
    bg-white 
    text-black
    hover:bg-emerald-100
  `;

  // Classes for the selected state
  const selectedClasses = `
    bg-emerald-500 
    text-white
  `;

  // Combine classes conditionally
  const buttonClasses = classNames(
    baseClasses,
    isSelected ? selectedClasses : unselectedClasses
  );

  return (
    <Link href={ButtonDestination}>
      <button type="button" className={buttonClasses} onClick={onClick}>
        <span>{labelTop}</span>
        <span>{labelBottom}</span>
      </button>
    </Link>
  );
};

export default HeaderButtonDouble;