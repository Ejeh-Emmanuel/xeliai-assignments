// src/pages/LoginPage.jsx

import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const requesKey = import.meta.env.VITE_REQUES_KEY

    async function onSubmit(data) {
        try {
            // reqres.in is a free mock API — no real backend needed
            const res = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "x-api-key": requesKey },
                body: JSON.stringify(data),
            })

            if (!res.ok) throw new Error('Invalid credentials')

            const { token } = await res.json()

            // Store user in Context + localStorage
            login({ email: data.email, token })

            // Send user to the dashboard after successful login
            navigate('/dashboard')

        } catch {
            // setError('root') creates a form-level error (not tied to a field)
            setError('root', { message: 'Invalid email or password. Please try again.' })
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm space-y-4"
            >
                <h1 className="text-2xl font-bold text-gray-900">Log In</h1>

                {/* Form-level error from failed API call */}
                {errors.root && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
                        {errors.root.message}
                    </p>
                )}

                {/* Email field */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        placeholder="you@example.com"
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
              ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('email', { required: 'Email is required' })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password field */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400
              ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit button — disables and shows spinner while submitting */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold
                     hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </button>

                <p className="text-sm text-center text-gray-500">
                    No account? <Link to="/signup" className="text-indigo-600 font-semibold">Sign up</Link>
                </p>
            </form>
        </div>
    )
}