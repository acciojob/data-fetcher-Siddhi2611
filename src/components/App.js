import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [data, setData] = useState(null); // to store API data
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    // Fetch data using .then() to avoid regeneratorRuntime issue
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => {
        // Handle empty or missing data
        if (!jsonData || !jsonData.products || jsonData.products.length === 0) {
          setData(null);
        } else {
          setData(jsonData);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      {loading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !data && <p>No data found</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default App;
