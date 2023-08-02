import styles from "./ListRow.module.css";

const ListCell = ({ children, onClick, isSelected }) => {
  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.selected : ""} ${
        styles.cell
      }`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default ListCell;
