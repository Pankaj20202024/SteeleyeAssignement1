import ListRow from "./ListRow";
import ListRowCell from "./ListRowCell";

import ListHeader from "./ListHeader";
import ListHeaderCell from "./ListHeaderCell";

import styles from "./List.module.css";
import { useState } from "react";


const List = ({ rows, SelectedCurrency, searchText, onRowSelect }) => {
  const filteredRows = searchText
    ? rows.filter((row) =>
        row["&id"].includes(searchText)
      )
    : rows;

  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleRowClick = (rowId) => {
    setSelectedRowId(rowId);
    const selectedRow = rows.find((row) => row["&id"] === rowId);
    onRowSelect(selectedRow);
  };

  return (
    <>
      <table className={styles.container}>
        <thead>
          <ListHeader>
            <ListHeaderCell>Order ID</ListHeaderCell>
            <ListHeaderCell>Buy/Sell</ListHeaderCell>
            <ListHeaderCell>Country</ListHeaderCell>
            <ListHeaderCell>Order Submitted</ListHeaderCell>
            <ListHeaderCell>Order Volume / {SelectedCurrency}</ListHeaderCell>
          </ListHeader>
        </thead>
        <tbody>
          {filteredRows.map((row) => (
            <ListRow
              key={row["&id"]}
              onClick={() => handleRowClick(row["&id"])}
              isSelected={selectedRowId === row["&id"]}
            >
              <ListRowCell>{row["&id"]}</ListRowCell>
              <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
              <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
              <ListRowCell>
                {row.timestamps?.orderSubmitted || "N/A"}
              </ListRowCell>
              {/* FOR USD */}
              {SelectedCurrency === "USD" && (
                <ListRowCell>
                  {row.bestExecutionData.orderVolume.USD}
                </ListRowCell>
              )}

              {/* FOR GBP */}
              {SelectedCurrency === "GBP" && (
                <ListRowCell>
                  {row.bestExecutionData.orderVolume.GBP}
                </ListRowCell>
              )}

              {/* FOR JPY */}
              {SelectedCurrency === "JPY" && (
                <ListRowCell>
                  {row.bestExecutionData.orderVolume.JPY}
                </ListRowCell>
              )}

              {/* FOR EUR */}
              {SelectedCurrency === "EUR" && (
                <ListRowCell>
                  {row.bestExecutionData.orderVolume.EUR}
                </ListRowCell>
              )}

              {!["USD", "JPY", "EUR", "GBP"].includes(SelectedCurrency) && (
                <ListRowCell>N/A</ListRowCell>
              )}
            </ListRow>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default List;
