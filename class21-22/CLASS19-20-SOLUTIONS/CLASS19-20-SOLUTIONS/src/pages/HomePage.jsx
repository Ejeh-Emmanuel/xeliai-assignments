// HW19 + HW20 combined — responsive Tailwind grid + React Hook Form search
import { useState, useEffect } from 'react'
import CountryCard from '../components/CountryCard'
import LoadingSpinner from '../components/LoadingSpinner'
import SearchForm from '../components/SearchForm'

const API_URL =
  'https://restcountries.com/v3.1/region/africa?fields=name,flags,capital,population,subregion'

const HomePage = () => {
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [activeQuery, setActiveQuery] = useState('')

  // ── Fetch once on mount ──────────────────────────────────────────────────
  const fetchCountries = async () => {
    setLoading(true)
    setError(null)
    try {
      const res  = await fetch(API_URL)
      const data = await res.json()
      // Sort alphabetically so the grid is predictable
      const sorted = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      )
      setCountries(sorted)
      setFiltered(sorted)
    } catch {
      setError('Could not load countries. Check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchCountries() }, [])

  // ── Search handler (from SearchForm) ────────────────────────────────────
  const handleSearch = (query) => {
    setActiveQuery(query)
    const q = query.toLowerCase()
    setFiltered(
      countries.filter((c) =>
        c.name.common.toLowerCase().includes(q) ||
        c.subregion?.toLowerCase().includes(q)
      )
    )
  }

  const handleClear = () => {
    setActiveQuery('')
    setFiltered(countries)
  }

  // ── Early returns ────────────────────────────────────────────────────────
  if (loading) return <LoadingSpinner message="Loading African countries..." />

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">{error}</p>
      <button
        onClick={fetchCountries}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Try Again
      </button>
    </div>
  )

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          African Countries
        </h1>
        <p className="text-gray-500 text-sm">
          {filtered.length} of {countries.length} countries
          {activeQuery && (
            <span className="ml-1 text-indigo-600 font-medium">
              matching &ldquo;{activeQuery}&rdquo;
            </span>
          )}
        </p>
      </div>

      {/* HW20: Search form with React Hook Form */}
      <SearchForm onSearch={handleSearch} onClear={handleClear} />

      {/* Empty state when search has no results */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-gray-500 text-lg">
            No countries match &ldquo;{activeQuery}&rdquo;
          </p>
          <button
            onClick={handleClear}
            className="mt-4 text-indigo-600 text-sm font-semibold hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* HW19: Responsive grid — 1 col → 2 → 3 → 4 as screen grows */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
