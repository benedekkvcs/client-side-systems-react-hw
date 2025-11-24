import React, { useState } from "react";
import "./EditItem.less";

interface EditItemFormProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    category: string;
  };
  categories: string[];
  onSave: (
    id: number,
    name: string,
    quantity: number,
    category: string
  ) => void;
  onCancel: () => void;
}

/**
 * A form component for editing an existing item in the list.
 *
 * This component provides inputs for editing the name, quantity, and category of an item.
 * Once the changes are made, the user can either save or cancel the operation.
 *
 * @param {ListItemType} props.item - The item being edited, containing its current properties.
 * @param {string[]} props.categories - Array of available categories for selection.
 * @param {function} props.onSave - Callback function to save the changes.
 * @param {function} props.onCancel - Callback function to cancel the editing operation.
 */
export function EditItem({item, categories, onSave, onCancel}: EditItemFormProps) {
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState<number>(item.quantity);
  const [editCategory, setEditCategory] = useState(item.category);

  const handleSave = () => {
    onSave(item.id, editName, editQuantity, editCategory);
  };

  const setName = (event) => setEditName(event.target.value);
  const setQuantity = (event) => setEditQuantity(event.target.value);
  const setCategory = (event) => setEditCategory(event.target.value);

  return (
    <div className="edit-item-form">
      <input
        type="text"
        value={editName}
        onChange={setName}
        className="edit-name"
      />
      <input
        type="number"
        value={editQuantity}
        onChange={setQuantity}
        className="edit-quantity"
      />
      <select
        value={editCategory}
        onChange={setCategory}
        className="edit-category"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button onClick={handleSave} className="button">
        Mentés
      </button>
      <button onClick={onCancel} className="button">
        Mégse
      </button>
    </div>
  );
}
