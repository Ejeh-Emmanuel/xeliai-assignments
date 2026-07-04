// HW19 — Tailwind-styled card. Receives data as props, no fetching here.
import { Link } from 'react-router-dom'

const CountryCard = ({ country }) => {
  const { name, flags, capital, population, subregion } = country

  return (
    // Link wraps the whole card — clicking anywhere navigates to the detail page
    <Link
      to={`/country/${name.common}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden
                 hover:shadow-xl hover:-translate-y-1 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
      {/* Flag image — object-cover keeps consistent height regardless of flag shape */}
      <img
        src={flags.svg}
        alt={`Flag of ${name.common}`}
        className="w-full h-40 object-cover"
      />

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-2 truncate">
          {name.common}
        </h3>

        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Capital: </span>
            {capital?.[0] ?? 'N/A'}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Population: </span>
            {population.toLocaleString()}
          </p>
          {subregion && (
            <span className="inline-block mt-2 text-xs bg-indigo-100 text-indigo-700
                            font-semibold px-2 py-0.5 rounded-full">
              {subregion}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CountryCard
