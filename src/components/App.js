import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try fetching from API
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((jsonData) => {
        // If no data or empty products
        if (!jsonData || !jsonData.products || jsonData.products.length === 0) {
          setData([]);
        } else {
          setData(jsonData.products);
        }
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      {loading && <p>Loading data...</p>}
      {!loading && error && <p>An error occurred: {error}</p>}
      {!loading && !error && data && data.length === 0 && <p>[]</p>}
      {!loading && !error && data && data.length > 0 && (
        <div>
          <h2>Data Fetched from API</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
