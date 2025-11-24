import React from "react";
import "./ListHeader.less";

/**
 * A component for rendering the header of the list.
 *
 * This component displays column headers for the list, including "Név", "Mennyiség",
 * "Kategória", and "Műveletek". It provides a consistent structure for aligning the
 * content in the `ListElement` components.
 *
 * @returns {JSX.Element} The header of the list with column labels.
 */
export function ListHeader() {
  return (
    <div className="list-header">
      <span className="list-header-name">Név</span>
      <span className="list-header-quantity">Mennyiség</span>
      <span className="list-header-category">Kategória</span>
      <span className="list-header-operation">Műveletek</span>
    </div>
  );
}
