import React, { useState } from "react";
import "./Form.less";
import { CategoryDrop } from "./CategoryDrop";

interface AddItemFormProps {
  onAddItem: (
    id: number,
    name: string,
    quantity: number,
    category: string
  ) => void;
  categories: string[];
}

/**
 * A form component for adding a new item to the list.
 *
 * This component allows the user to input a name, quantity, and category for a new item.
 * On submission, it calls the `onAddItem` function passed as a prop to add the item
 * to the parent component's state.
 *
 * @param {function} props.onAddItem - Callback function to add a new item.
 * @param {string[]} props.categories - Array of available categories for selection.
 */
export function AddItemForm({ onAddItem, categories }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [category, setCategory] = useState("Élelmiszer");

  /**
   * Handles the form submission to add a new item.
   *
   * Validates the input fields, then calls `onAddItem` with the new item's details.
   * Resets the form fields to their default values after submission.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() === "") return;
    onAddItem(Date.now(), name, quantity, category);
    setName("");
    setQuantity(1);
    setCategory("Élelmiszer");
  };

  const changeName = (event) => setName(event.target.value);

  const changeQuantity = (event) => setQuantity(event.target.value);

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <label className="form-Name">Új elem hozzáadása</label>
      <input
        type="text"
        placeholder="Termék neve"
        value={name}
        onChange={changeName}
        className="form-input"
        required
      />
      <input
        type="number"
        placeholder="Mennyiség"
        value={quantity}
        min="1"
        onChange={changeQuantity}
        className="form-input"
        required
      />
      <CategoryDrop
        selectedCategory={category}
        onCategoryChange={setCategory}
        categories={categories}
      />
      <button type="submit" className="form-button">
        Hozzáadás
      </button>
    </form>
  );
}
