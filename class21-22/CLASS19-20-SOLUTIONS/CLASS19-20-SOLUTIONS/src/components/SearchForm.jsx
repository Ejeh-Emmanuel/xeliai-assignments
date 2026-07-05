// HW20 — React Hook Form with Tailwind styling and 2 validation rules
// This SearchForm is connected to the parent's filter logic via the onSearch prop.
import { useForm } from 'react-hook-form'

const SearchForm = ({ onSearch, onClear }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    // Small artificial delay so isSubmitting is visible (remove in production)
    await new Promise((r) => setTimeout(r, 300))
    onSearch(data.query)
  }

  const handleClear = () => {
    reset()          // clears React Hook Form state
    onClear()        // tells parent to show all countries again
  }

  // Reusable input class — red border when there's a validation error
  const inputClass = `flex-1 px-4 py-2 border rounded-lg text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors
    ${errors.query ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`

  return (
    <div className="mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-2 max-w-lg"
      >
        <input
          type="text"
          placeholder="Search countries..."
          className={inputClass}
          {...register('query', {
            // RULE 1: field cannot be empty
            required: 'Please enter a country name to search',
            // RULE 2: must be at least 2 characters (avoids useless single-letter searches)
            minLength: {
              value: 2,
              message: 'Search must be at least 2 characters',
            },
          })}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold
                     rounded-lg hover:bg-indigo-700 transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>

        <button
          type="button"
          onClick={handleClear}
          className="px-5 py-2 border border-gray-300 text-gray-700 text-sm
                     font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
      </form>

      {/* Error message — only appears when there's a validation error */}
      {errors.query && (
        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
          <span>⚠</span>
          {errors.query.message}
        </p>
      )}
    </div>
  )
}

export default SearchForm
