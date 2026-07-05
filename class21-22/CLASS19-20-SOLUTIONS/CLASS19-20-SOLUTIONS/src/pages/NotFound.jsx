// 404 catch-all page — matched by path="*" in App.jsx
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <p className="text-8xl font-black text-indigo-100 select-none">404</p>
    <h1 className="text-2xl font-bold text-gray-800 mt-2 mb-2">
      Page Not Found
    </h1>
    <p className="text-gray-500 mb-6 max-w-xs">
      The page you&apos;re looking for doesn&apos;t exist.
    </p>
    <Link
      to="/"
      className="px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg
                 hover:bg-indigo-700 transition-colors"
    >
      ← Back to Home
    </Link>
  </div>
)

export default NotFound
