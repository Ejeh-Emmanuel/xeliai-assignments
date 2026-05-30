import { useState, useEffect, useCallback } from 'react';
import '../css/index.css';

const LiveData = () => {
  // 1. STATE VARIABLES
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 2. FETCH LOGIC
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://fakestoreapi.com/products?limit=6');
      if (!res.ok) throw new Error('Network response was not ok');
      
      const json = await res.json();
      setProducts(json);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch {
      setError('Failed to fetch products. Check your connection.');
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. LIFECYCLE
  useEffect(() => {
    const loadProducts = async () => {
      await fetchData();
    };

    void loadProducts();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // 4. CONDITIONAL RENDERING (Loading/Error States)
  if (loading && products.length === 0) {
    return (
      <div className="status-container">
        <p>Loading the latest deals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-container">
        <h3 className="error-text">Error: {error}</h3>
        <button onClick={fetchData} className="refresh-btn">Try Again</button>
      </div>
    );
  }

  // 5. MAIN RENDER
  return (
    <div className="live-data-container">
      <header className="live-data-header">
        <h2>TrendStore Live Feed</h2>
        <p className="timestamp">Last updated: {lastUpdated}</p>
        <button onClick={fetchData} className="refresh-btn">Refresh Products</button>
      </header>

      {products.length === 0 ? (
        <p className="status-container">No products found at the moment.</p>
      ) : (
        <div className="product-grid">
          {products.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.title} className="product-image" />
              <h4 className="product-title">{item.title}</h4>
              <p className="product-category">{item.category}</p>
              <p className="product-price">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveData;