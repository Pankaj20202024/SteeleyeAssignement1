import { useState } from "react";

// Data
import mockData from "../assets/data.json";
import timestamps from "../assets/timeStamps.json";

// Components
import Dropdown from "../component/dropdown/Dropdown";
import HeaderTitle from "../component/header-title/HeaderTitle";
import Search from "../component/search/Search";
import List from "../component/list/List";

// Styles
import styles from "./Dashboard.module.css";
import Card from "../component/card/Card";

const Dashboard = () => {
  const [currency, setCurrency] = useState("USD");
  const [searchText, setSearchText] = useState("");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState({});
  const [selectedOrderTimeStamps, setSelectedOrderTimeStamps] = useState({});

  // Below code is for merging the timestamps array of timestamps.json with the corresponding order of result array of  dataWithTimestamps.json file

  const mergeTimestampsWithOrders = () => {
    const mergedData = mockData.results.map((order, index) => {
      const timestampsData = timestamps.results[index]?.timestamps;
      if (timestampsData) {
        return { ...order, timestamps: timestampsData };
      }
      return order;
    });
    return { ...mockData, results: mergedData };
  };

  const dataWithTimestamps = mergeTimestampsWithOrders();

  // Function to handle order selection
  const handleRowSelect = (order) => {
    setSelectedOrderDetails({
      buySellIndicator: order.executionDetails.buySellIndicator,
      orderStatus: order.executionDetails.orderStatus,
      orderType: order.executionDetails.orderType,
    });

    setSelectedOrderTimeStamps({
      orderRecieved: order.timestamps.orderReceived,
      orderStatusUpadate: order.timestamps.orderStatusUpdated,
      orderSubmitted: order.timestamps.orderSubmitted,
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        <div className={styles.actionBox}>
          <Search
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Dropdown
            options={["GBP", "USD", "JPY", "EUR"]}
            onChange={(e) => setCurrency(e.target.value)}
            selectedItem={currency}
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.section}>
          <Card
            cardData={selectedOrderDetails}
            title="Selected Order Details"
          />
          <Card
            cardData={selectedOrderTimeStamps}
            title="Selected Order Timestamps"
          />
        </div>

        <List
          rows={dataWithTimestamps.results}
          SelectedCurrency={currency}
          searchText={searchText}
          onRowSelect={handleRowSelect}
        />
      </div>
    </div>
  );
};

export default Dashboard;
