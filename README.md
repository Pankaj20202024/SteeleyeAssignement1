#### hosted link : https://mysteeleyeassignment1.netlify.app

***

### Task 1: Update Header Title to Display Total Number of Orders

In the `Dashboard` component, the header title initially displayed the number of orders as "5 orders," but there are actually 6 orders in the table. To fix this issue and accurately display the total number of orders in the header title, I have made the following changes:

#### Code Explanation:

```jsx

// File: Dashboard.jsx

// Changed code in the Dashboard component to update the header title
const Dashboard = () => {
  // ... existing code ...
  return (
    <div>
      <div className={styles.header}>
        <HeaderTitle
          primaryTitle="Orders"
          secondaryTitle={`${mockData.results.length} orders`}
        />
        {/* ... existing code ... */}
      </div>
      {/* ... existing code ... */}
    </div>
  );
};

```

#### Explanation:

I have updated the `secondaryTitle` prop of the `HeaderTitle` component to dynamically display the correct total number of orders. The expression `${mockData.results.length}` retrieves the length of the results array in `mockData`, which represents the total number of orders, and appends it to the string "orders".

#### Conclusion:

Task 1 has been successfully completed. The header title in the Dashboard component now displays the correct total number of orders, dynamically retrieved from the data. This enhancement improves the accuracy of the displayed information and enhances the user experience.

<img width="960" alt="task1" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/8c4145f7-00b1-496f-b146-d7bb439e2190">

***

### Task 2: Display Order Submitted Date in the Table

In the Dashboard component, I added functionality to display the "Order Submitted Date" in the table. The order data initially did not include the submitted date, but I have given the necessary timestamp data available in `src/assets/timeStamps.json` with corresponding IDs. To achieve this, I made the following changes:

#### Code Explanation:
Inside `Dashboard.jsx`:

```jsx

// File: Dashboard.jsx

// Function to merge timestamps with order data
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

// Merge data and store it in dataWithTimestamps variable
const dataWithTimestamps = mergeTimestampsWithOrders();

```

Inside `Dashboard.jsx`, I created a function `mergeTimestampsWithOrders` to retrieve the timestamps data from `timeStamps.json` and merge it with the order data present in `data.json`. The merged data is stored in the `dataWithTimestamps` variable.

```jsx

// File: Dashboard.jsx

// Pass dataWithTimestamps as a prop to List component
<List
  rows={dataWithTimestamps.results}
  SelectedCurrency={currency}
  searchText={searchText}
  onRowSelect={handleRowSelect}
/>

```

I passed the `dataWithTimestamps` as a prop to the `List.jsx` component to provide the updated data with order submitted dates.

Inside `List.jsx`:

```jsx

// File: List.jsx

// Display Order Submitted Date in the ListRowCell
<ListRowCell>
  {row.timestamps?.orderSubmitted || "N/A"}
</ListRowCell>

```

I updated the `ListRowCell` to display the "Order Submitted Date" for each row. I access the date from the merged data using `row.timestamps?.orderSubmitted || "N/A"`.

#### Conclusion:

Task 2 has been successfully completed. The "Order Submitted Date" is now being displayed in the table for each row, retrieved from the merged data that combines the order data with the timestamps data. This improvement provides users with valuable information about each order and enhances the overall usability of the application.

<img width="201" alt="Screenshot 2023-08-03 231101" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/590644e3-6634-42e4-b19b-0b969db994d5">

***

### Task 3: Display Currency Value in Order Volume Cell

In the `Dashboard` component, the Order Volume cell currently displays the value in USD. However, I have to update it to display the currency value selected from the dropdown located in the header of the dashboard. To achieve this, I have done the following changes :

**Step 1:** Propagate Currency Value to List Component

In the `Dashboard.jsx` file, I have passed the currency value as a prop to the `List` component. This allows the List component to access and use the selected `currency` value.

```jsx

// File: Dashboard.jsx

// Declare and initialize the currency state
const [currency, setCurrency] = useState("USD");

// ... existing code ...

return (
  <div>
    <div className={styles.header}>
      {/* ... existing code ... */}

      {/* Pass the currency value as a prop to the List component */}
      <List
        rows={dataWithTimestamps.results}
        SelectedCurrency={currency}
        searchText={searchText}
        onRowSelect={handleRowSelect}
      />
    </div>
    {/* ... existing code ... */}
  </div>
);

```

**Step 2:** Update Order Volume Cell in List Component

Inside the `List.jsx` file, I have updated the Order Volume cell to display the value according to the selected currency. I have used conditional rendering to determine which currency value to display.

```jsx

// File: List.jsx

const List = ({ rows, SelectedCurrency, searchText, onRowSelect }) => {
  // ... existing code ...

  return (
    <div>
      {/* ... existing code ... */}
      {rows.map((row) => (
        <ListRow key={row.id} onClick={() => onRowSelect(row)}>
          {/* ... existing code ... */}

          {/* FOR USD */}
          {SelectedCurrency === "USD" && (
            <ListRowCell>{row.bestExecutionData.orderVolume.USD}</ListRowCell>
          )}

          {/* FOR GBP */}
          {SelectedCurrency === "GBP" && (
            <ListRowCell>{row.bestExecutionData.orderVolume.GBP}</ListRowCell>
          )}

          {/* FOR JPY */}
          {SelectedCurrency === "JPY" && (
            <ListRowCell>{row.bestExecutionData.orderVolume.JPY}</ListRowCell>
          )}

          {/* FOR EUR */}
          {SelectedCurrency === "EUR" && (
            <ListRowCell>{row.bestExecutionData.orderVolume.EUR}</ListRowCell>
          )}

          {!["USD", "JPY", "EUR", "GBP"].includes(SelectedCurrency) && (
            <ListRowCell>N/A</ListRowCell>
          )}

          {/* ... existing code ... */}
        </ListRow>
      ))}
      {/* ... existing code ... */}
    </div>
  );
};

```

#### Conclusion

With these changes, the Order Volume cell will now display the appropriate currency value based on the selection made in the currency dropdown located in the header of the dashboard. This enhancement ensures that users can easily view order volumes in their desired currency, improving the user experience.

<img width="214" alt="Screenshot 2023-08-03 231113" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/39f892fa-e8a7-40d1-9819-8699eafadf1b">

<img width="212" alt="Screenshot 2023-08-03 231124" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/89129a26-e826-4dd4-b481-aeb268320f5a">

<img width="207" alt="Screenshot 2023-08-03 231133" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/d0222f57-de42-4f67-a83f-a264dc495ecf">

<img width="211" alt="Screenshot 2023-08-03 231144" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/f391389c-2405-490a-8644-37d93e23e2f5">

### Task 4: Adding Search Feature for Order IDs

To implement the search feature for order IDs, I made the following changes to the `Dashboard.jsx` and `List.jsx` files:

**Step 1:** Propagate Search Text to List Component

Inside the `Dashboard.jsx` file, I passed the `searchText` as a prop to the `List` component. Additionally, I used the `useState` hook to store the value of `searchText`.

```jsx

// File: Dashboard.jsx

// Declare and initialize the searchText state
const [searchText, setSearchText] = useState("");

// ... existing code ...

return (
  <div>
    <div className={styles.header}>
      {/* ... existing code ... */}

      {/* Pass the searchText value as a prop to the List component */}
      <List
        rows={dataWithTimestamps.results}
        SelectedCurrency={currency}
        searchText={searchText}
        onRowSelect={handleRowSelect}
      />
    </div>
    {/* ... existing code ... */}
  </div>
);

```

**Step 2:** Filter Rows Based on Search Text

Inside the `List.jsx` file, I used the `filter()` method to filter the rows based on the search text provided by the user. I stored the filtered rows in a variable called `filteredRows`.

```jsx

// File: List.jsx

const List = ({ rows, SelectedCurrency, searchText, onRowSelect }) => {
  // ... existing code ...

  // Filter rows based on search text
  const filteredRows = searchText
    ? rows.filter((row) =>
        row["&id"].toLowerCase().includes(searchText.toLowerCase())
      )
    : rows;

  // ... existing code ...

  return (
    <div>
      {/* ... existing code ... */}
      {filteredRows.map((row) => (
        <ListRow
          key={row["&id"]}
          onClick={() => handleRowClick(row["&id"])}
          isSelected={selectedRowId === row["&id"]}
        >
          {/* ... existing code ... */}
        </ListRow>
      ))}
      {/* ... existing code ... */}
    </div>
  );
};

```

The `filteredRows` variable holds the filtered rows, which include only those rows whose "&id" value contains the search text provided by the user. 

**Step 3:** Display Filtered Rows in the Table

With the `filteredRows` array ready, I can now use it to display the filtered data in the table. I used the `map()` function to iterate over the `filteredRows` array and display the relevant information.

```jsx

// File: List.jsx

const List = ({ rows, SelectedCurrency, searchText, onRowSelect }) => {
  // ... existing code ...

  const filteredRows = /* ... */; // Filter rows based on search text

  return (
    <div>
      {/* ... existing code ... */}
      {filteredRows.map((row) => (
        <ListRow
          key={row["&id"]}
          onClick={() => handleRowClick(row["&id"])}
          isSelected={selectedRowId === row["&id"]}
        >
          {/* ... existing code ... */}

          {/* Display order ID */}
          <ListRowCell>{row["&id"]}</ListRowCell>

          {/* ... existing code ... */}
        </ListRow>
      ))}
      {/* ... existing code ... */}
    </div>
  );
};

```

The filtered rows will now be displayed in the table, and the table will dynamically update as the user types in the search bar, showing only the rows that match the order IDs containing the search text. This feature improves the usability of the dashboard by allowing users to quickly find specific orders.

<img width="960" alt="Screenshot 2023-08-02 111550" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/4448370a-dd30-487f-8a24-6aa3ffc69e6e">

<img width="960" alt="Screenshot 2023-08-02 111646" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/9d5debbd-e072-4234-b622-225fb1f6d49c">

### Task 5: Clear Console Errors and Warnings

To resolve the console error of "multiple children with the same key," I have made the necessary changes in the `data.json` file to ensure that each order has a unique ID. By doing this, I made sure that React can uniquely identify each element in the list.

Furthermore, when using the `map` function in the `List.jsx` file to render the list of orders, I passed the `id` as a `key` prop. This change helped React efficiently update the list when changes occur and eliminated the warning of duplicate keys.

```jsx 

{filteredRows.map((row) => (
  <ListRow
    key={row.id} // Using the 'id' as the key to uniquely identify each row
    onClick={() => handleRowClick(row.id)}
    isSelected={selectedRowId === row.id}
  >
    <ListRowCell>{row.id}</ListRowCell>
    <ListRowCell>{row.executionDetails.buySellIndicator}</ListRowCell>
    <ListRowCell>{row.executionDetails.orderStatus}</ListRowCell>
    <ListRowCell>
      {row.timestamps?.orderSubmitted || "N/A"}
    </ListRowCell>
    {/* For USD */}
    {SelectedCurrency === "USD" && (
      <ListRowCell>
        {row.bestExecutionData.orderVolume.USD}
      </ListRowCell>
    )}

    {/* For GBP */}
    {SelectedCurrency === "GBP" && (
      <ListRowCell>
        {row.bestExecutionData.orderVolume.GBP}
      </ListRowCell>
    )}

    {/* For JPY */}
    {SelectedCurrency === "JPY" && (
      <ListRowCell>
        {row.bestExecutionData.orderVolume.JPY}
      </ListRowCell>
    )}

    {/* For EUR */}
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

```

With these changes, I successfully cleared the console errors and warnings related to duplicate keys, ensuring a cleaner and error-free development environment.

<img width="960" alt="Screenshot 2023-08-02 112016" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/eb28617c-0c7a-4470-8412-0763a80b2140">

### Task 6: Populating Card on Order Selection

To enable the functionality of populating a card with order details when a user selects an order from the list, I made several changes to the code.

#### Inside Dashboard.jsx:

I created a `handleRowSelect` function that takes an `order` as an argument. This function sets the selected order details and timestamps using the `setSelectedOrderDetails` and `setSelectedOrderTimeStamps` functions, respectively. The `handleRowSelect` function is passed as a prop to the `List.jsx` component.

```jsx

const handleRowSelect = (order) => {
  setSelectedOrderDetails({
    buySellIndicator: order.executionDetails.buySellIndicator,
    orderStatus: order.executionDetails.orderStatus,
    orderType: order.executionDetails.orderType,
  });

  setSelectedOrderTimeStamps({
    orderReceived: order.timestamps.orderReceived,
    orderStatusUpdated: order.timestamps.orderStatusUpdated,
    orderSubmitted: order.timestamps.orderSubmitted,
  });
};

```

#### Inside List.jsx:

I introduced a state variable `selectedRowId` using the `useState` hook to keep track of the currently selected row's ID. The `handleRowClick` function is used to set the `selectedRowId` to the ID of the clicked row. Additionally, the function finds the selected row using the ID and passes it to the `onRowSelect` prop (which is the `handleRowSelect` function passed from the `Dashboard.jsx`).

```jsx

const [selectedRowId, setSelectedRowId] = useState(null);

const handleRowClick = (rowId) => {
  setSelectedRowId(rowId);
  const selectedRow = rows.find((row) => row["&id"] === rowId);
  onRowSelect(selectedRow);
};

```

#### Inside ListRow.jsx:

I made changes to the `ListRow` component to include the `onClick` and `isSelected` props. The `ListRow` component renders as a table row (`<tr>`) with the class name `styles.selected` when it is selected, applying CSS styles to highlight the selected row.

```jsx

const ListRow = ({ children, onClick, isSelected }) => {
  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

```

#### Inside Card.jsx:

I made sure that the `Card` component properly handles the `cardData` prop, which contains the selected order details and timestamps. The component uses `Object.entries` to map through the properties of the `cardData` object and display them in a structured manner.

```jsx

const Card = ({ cardData, title }) => {
  if (!cardData) return null;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {Object.entries(cardData).map(([k, v]) => (
        <div className={styles.cell} key={k}>
          <div className={styles.value}>{k}</div>
          <div className={styles.value}>{v}</div>
        </div>
      ))}
    </div>
  );
};

```

By following these changes, whenever a user clicks on an order row in the list, the selected order details will be displayed on top of the listing component in a card-like format. This enhances the user experience by providing them with a quick view of the selected order's information.

<img width="948" alt="Screenshot 2023-08-02 111457" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/d5187ccd-1459-49b2-96ff-24c00b5b61a7">

<img width="944" alt="Screenshot 2023-08-02 111512" src="https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/65248a6f-c6e2-4940-81c6-462e8b775457">

### Execution Vedio

https://github.com/Pankaj20202024/SteeleyeAssignement1/assets/121535589/e252056a-a1a7-478a-b7ee-2194c58bb362

