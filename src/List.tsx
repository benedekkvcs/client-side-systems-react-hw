import React from "react";
import { ListElement } from "./ListElement";
import { EditItem} from "./EditItem";
import "./List.less";
import { ListItem } from "../types";
import { ListHeader } from "./ListHeader";

interface ListProps {
  items: ListItem[];
  onTogglePurchased: (id: number) => void;
  onDeleteItem: (id: number) => void;
  onEditItem: (id: number, name: string, quantity: number, category: string) => void;
  editItemId: number | null;
  setEditItemId: (id: number | null) => void;
  categories: string[];
}

/**
 * A component for displaying a list of items with edit and delete functionality.
 *
 * The component renders each item either in a default view (via `ListElement`) or
 * in an editable form (via `EditItem`) based on whether the item's ID matches the
 * currently edited item's ID. It also includes a header for the list.
 *
 * @param {ListItemType[]} props.items - The array of items to display in the list.
 * @param {function} props.onTogglePurchased - Callback function to toggle the purchased state of an item.
 * @param {function} props.onDeleteItem - Callback function to delete an item from the list.
 * @param {function} props.onEditItem - Callback function to save edits made to an item.
 * @param {number | null} props.editItemId - The ID of the currently edited item, or `null` if no item is being edited.
 * @param {function} props.setEditItemId - Callback function to set the ID of the item being edited.
 * @param {string[]} props.categories - The list of available categories for editing items.
 */
export function List({
  items,
  onTogglePurchased,
  onDeleteItem,
  onEditItem,
  editItemId,
  setEditItemId,
  categories,
}: ListProps) {
  return (
    <div className="list">
              <ListHeader></ListHeader>
      {items.map((item) =>
        item.id === editItemId ? (
          <EditItem
            item={item}
            categories={categories}
            onSave={(id, name, quantity, category) => {
              onEditItem(id, name, quantity, category);
            }}
            onCancel={() => setEditItemId(null)}
            
          />
        ) : (
          <ListElement
            item={item}
            onTogglePurchased={onTogglePurchased}
            onDeleteItem={onDeleteItem}
            setEditItemId={setEditItemId}
          />
        )
      )}
    </div>
  );
}
