import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./ListElement.less";
import { ListItem } from "../types";

interface ListItemProps {
  item: ListItem;
  onTogglePurchased: (id: number) => void;
  onDeleteItem: (id: number) => void;
  setEditItemId: (id: number | null) => void;
}

/**
 * A component for displaying a single item in the list.
 *
 * This component shows the item's details, including name, quantity, and category,
 * and provides controls for toggling its purchased state, editing, or deleting it.
 *
 * @param {ListItemType} props.item - The item to display, including its properties.
 * @param {function} props.onTogglePurchased - Callback function to toggle the item's purchased state.
 * @param {function} props.onDeleteItem - Callback function to delete the item from the list.
 * @param {function} props.setEditItemId - Callback function to set the ID of the item being edited.
 */
export function ListElement({
  item,
  onTogglePurchased,
  onDeleteItem,
  setEditItemId,
}: ListItemProps) {
  return (
    <div className={`list-item ${item.purchased ? "purchased" : ""}`}>
      <div className="item-details">
        <span className="item-name">{item.name}</span>
        <span className="item-quantity">{item.quantity} db</span>
        <span className="item-category">{item.category}</span>
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={() => onTogglePurchased(item.id)}
          className="item-checkbox"
        />
        <FontAwesomeIcon
          icon={faPenToSquare}
          className="item-edit"
          onClick={() => setEditItemId(item.id)}
        />
        <FontAwesomeIcon
          icon={faTrashCan}
          className="item-delete"
          onClick={() => onDeleteItem(item.id)}
        />
      </div>
    </div>
  );
}
