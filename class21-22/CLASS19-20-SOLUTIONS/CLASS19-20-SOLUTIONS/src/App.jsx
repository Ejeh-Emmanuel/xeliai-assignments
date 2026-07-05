import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import CountryPage from './pages/CountryPage'
import NotFound from './pages/NotFound'

const App = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Routes>
        <Route path="/"             element={<HomePage />} />
        <Route path="/country/:name" element={<CountryPage />} />
        <Route path="*"             element={<NotFound />} />
      </Routes>
    </main>
  </div>
)

export default App
