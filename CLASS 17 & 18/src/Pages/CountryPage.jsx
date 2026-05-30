import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function CountryPage() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCountry = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (!response.ok) 
        { throw new Error('Failed to fetch country details'); }

      const data = await response.json();
      setCountry(data[0] ?? null);
    } catch (fetchError) {
      setError(fetchError.message || 'An error occurred while fetching country details');
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    if (!name) return;

    const timeoutId = setTimeout(fetchCountry, 0);
    return () => clearTimeout(timeoutId);
  }, [fetchCountry, name]);

  if (loading) {
    return <p>Loading country details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!country) {
    return <p>No country details found.</p>;
  }

  return (
    <>
      <button onClick={() => navigate('/')}>Back to Home</button>
      <img src={country.flags?.svg} width="200" alt={`${country.name?.common} flag`} />
      <h1>{country.name?.common}</h1>
    </>
  );

}

export default CountryPage;
