// src/components/LiveDataApp.jsx

import { useEffect, useState } from "react";

const LiveDataApp = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://randomuser.me/api/?results=6");

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      setData(result.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when component loads
    useEffect(() => {
      fetchUsers();
    }, []);

  // Loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Error state
  if (error) {
    return (
      <div>
        <h2>Error: {error}</h2>

        <button onClick={fetchUsers}>Try Again</button>
      </div>
    );
  }

  // Empty state
  if (data.length === 0) {
    return (
      <div>
        <h2>No users found.</h2>

        <button onClick={fetchUsers}>Refresh</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Data App</h1>

      <button
        onClick={fetchUsers}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          cursor: "pointer",
        }}
      >
        Get New Users
      </button>

      <div>
        {data.map((user) => (
          <div
            key={user.login.uuid}
          >
            <img
              src={user.picture.large}
              alt={user.name.first}
            />

            <h3>
              {user.name.first} {user.name.last}
            </h3>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>City:</strong> {user.location.city}
            </p>

            <p>
              <strong>Country:</strong> {user.location.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDataApp;
