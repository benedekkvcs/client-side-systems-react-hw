import React, {useEffect, useState} from "react";
import "./index.less";
import {render} from "preact";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {List} from "./List";
import {AddItemForm} from "./Form";
import {FilterByCategory} from "./FilterByCategory";
import {ListHeader} from "./ListHeader";

export function App() {
  const initialItems = [];

  const [items, setItems] = useState(initialItems);
  const [filterCategory, setFilterCategory] = useState<string>(null);
  const [editItemId, setEditItemId] = useState<number>(null);

  const handleFilter = (category: string) => {
    setFilterCategory(category);
  };

  const resetFilter = () => {
    setFilterCategory(null);
  };

  /**
   * Adds a new item to the list at a specific position.
   *
   * This function inserts a new item at the specified index (`insertAt`) in the
   * current list of items. The new item includes an `id`, `name`, `quantity`,
   * `category`, and a default `purchased` status of `false`.
   *
   * @param {number} id - The unique identifier of the new item.
   * @param {string} name - The name of the new item.
   * @param {number} quantity - The quantity of the new item.
   * @param {string} category - The category of the new item.
   */
  const addItem = (
    id: number,
    name: string,
    quantity: number,
    category: string
  ) => {
    const insertAt = 0;

    const nextItems = [
      ...items.slice(0, insertAt),
      {
        id: id,
        name: name,
        quantity: quantity,
        category: category,
        purchased: false,
      },
      ...items.slice(insertAt),
    ];

    setItems(nextItems);
  };

  useEffect(() => {
    const data = window.localStorage.getItem("LOAD_ITEMS");
    setItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("LOAD_ITEMS", JSON.stringify(items));
  }, [addItem]);

  /**
   * Toggles the `purchased` status of a specific item in the list.
   *
   * This function locates the item in the current state by its `id` and flips its
   * `purchased` boolean value. The state is updated immutably.
   *
   * @param {number} id - The unique identifier of the item to toggle.
   */
  const togglePurchased = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? {...item, purchased: !item.purchased} : item
      )
    );
  };

  /**
   * Deletes an item from the list by its `id`.
   *
   * This function filters out the item with the specified `id` from the current
   * state and updates the list immutably.
   *
   * @param {number} id - The unique identifier of the item to delete.
   */
  const deleteItem = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  /**
   * Handles editing an item in the list by updating its properties.
   *
   * This function locates the item in the current state by its `id` and updates
   * its `name`, `quantity`, and `category` properties. After the update, it resets
   * the editing state to null, exiting the edit mode.
   *
   * @param {number} id - The unique identifier of the item to be edited.
   * @param {string} name - The updated name for the item.
   * @param {number} quantity - The updated quantity for the item.
   * @param {string} category - The updated category for the item.
   */
  const handleEdit = (
    id: number,
    name: string,
    quantity: number,
    category: string
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? {...item, name, quantity, category} : item
      )
    );
    setEditItemId(null);
  };

  const displayedItems = filterCategory
    ? items.filter((item) => item.category === filterCategory)
    : items;

  const categories = ["Élelmiszer", "Tisztítószer", "Háztartás"];

  return (
    <div className="app">
      <header className="app-header">
        <h1>
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
          Bevásárló Lista
        </h1>
      </header>
      <main className="app-content">
        <div className="list-container">
          <FilterByCategory
            categories={categories}
            onFilter={handleFilter}
            resetfilter={resetFilter}
          />
          <List
            items={displayedItems}
            onTogglePurchased={togglePurchased}
            onDeleteItem={deleteItem}
            editItemId={editItemId}
            setEditItemId={setEditItemId}
            onEditItem={handleEdit}
            categories={categories}
          />
        </div>
        <div className="form-container">
          <AddItemForm onAddItem={addItem} categories={categories} />
        </div>
      </main>
    </div>
  );
}

render(<App />, document.getElementById("app"));
