import React, { useState } from "react";
import { CategoryDrop } from "./CategoryDrop";
import "./FilterByCategory.less";

interface FilterByCategoryProps {
  categories: string[];
  onFilter: (category: string) => void;
  resetfilter: () => void;
}
/**
 * A component for filtering items by category.
 *
 * This component includes a dropdown for selecting a category and two buttons:
 * one for applying the filter and another for resetting it. The selected category
 * is managed locally in the component state and passed to the parent component
 * through the `onFilter` callback.
 *
 * @param {string[]} props.categories - Array of available categories for filtering.
 * @param {function} props.onFilter - Callback function to apply the filter with the selected category.
 * @param {function} props.resetfilter - Callback function to reset the filter and show all items.
 */
export function FilterByCategory({ categories, onFilter, resetfilter }: FilterByCategoryProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedCategory) {
      onFilter(selectedCategory);
    }
  };

  return (
    <div className="filter-by-category">
    <form className="filter-by-category" onSubmit={handleFilter}>
      <CategoryDrop
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
      <button type="submit" className="filter-button">
        Szűrés
      </button>
    </form>
    <button onClick={resetfilter} className="filter-button">Összes</button>
    </div>
  );
}
