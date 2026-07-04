// Detail page — reads :name from URL via useParams, fetches that country's data
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

const CountryPage = () => {
  const { name }   = useParams()
  const navigate    = useNavigate()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true)
      setError(null)
      try {
        const res  = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`
        )
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
        setCountry(data[0])
      } catch {
        setError(`Could not find data for "${name}".`)
      } finally {
        setLoading(false)
      }
    }
    fetchCountry()
  }, [name]) // re-run if the :name param changes

  if (loading) return <LoadingSpinner message={`Loading ${name}...`} />

  if (error) return (
    <div className="text-center py-20">
      <p className="text-red-500 mb-4">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        ← Go Back
      </button>
    </div>
  )

  if (!country) return null

  const {
    name: cName, flags, capital, population,
    area, region, subregion, languages, currencies, timezones, borders,
  } = country

  // Format languages: { eng: 'English', fra: 'French' } → 'English, French'
  const languageList = languages ? Object.values(languages).join(', ') : 'N/A'

  // Format currencies: { NGN: { name: 'Nigerian naira', symbol: '₦' } } → 'Nigerian naira (₦)'
  const currencyList = currencies
    ? Object.values(currencies).map((c) => `${c.name} (${c.symbol})`).join(', ')
    : 'N/A'

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-indigo-600 font-semibold
                   hover:text-indigo-800 transition-colors"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Flag banner */}
        <img
          src={flags.svg}
          alt={`Flag of ${cName.common}`}
          className="w-full h-52 object-cover"
        />

        <div className="p-6 md:p-8">
          {/* Country name */}
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            {cName.common}
          </h1>
          {cName.official !== cName.common && (
            <p className="text-gray-400 text-sm mb-4">{cName.official}</p>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {[
              ['Capital', capital?.[0] ?? 'N/A'],
              ['Region', region],
              ['Sub-region', subregion ?? 'N/A'],
              ['Population', population.toLocaleString()],
              ['Area', area ? `${area.toLocaleString()} km²` : 'N/A'],
              ['Languages', languageList],
              ['Currency', currencyList],
              ['Timezone(s)', timezones?.slice(0, 2).join(', ')],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-lg px-4 py-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                  {label}
                </p>
                <p className="text-gray-800 font-medium text-sm">{value}</p>
              </div>
            ))}
          </div>

          {/* Bordering countries — shown as clickable links */}
          {borders && borders.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                Bordering Countries
              </p>
              <div className="flex flex-wrap gap-2">
                {borders.map((code) => (
                  <Link
                    key={code}
                    to={`/country/${code}`}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs
                               font-semibold rounded-full hover:bg-indigo-200 transition-colors"
                  >
                    {code}
                  </Link>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Country codes — click to explore
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
