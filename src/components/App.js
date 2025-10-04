import React, { useState, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        data.length === 0 ? (
          <p>No data found</p>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
