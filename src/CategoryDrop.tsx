import React from "react";
import "./CategoryDrop.less";

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}
/**
 * A dropdown component for selecting a category.
 *
 * This component displays a list of categories in a dropdown menu. The selected
 * category is managed via a parent component through the `onCategoryChange` callback.
 *
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {function} props.onCategoryChange - Callback function to handle category changes.
 * @param {string[]} props.categories - Array of available categories for the dropdown.
 */
export function CategoryDrop({selectedCategory, onCategoryChange, categories}: CategoryDropdownProps) {
  const changeCategory = (event) => onCategoryChange(event.target.value);

  return (
    <select
      className="category-dropdown"
      value={selectedCategory}
      onChange={changeCategory}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}
