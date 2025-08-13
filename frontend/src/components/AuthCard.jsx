import GoogleIcon from '/src/components/icons/GoogleIcon.jsx';
import GithubIcon from '/src/components/icons/GithubIcon.jsx';
import { useState } from 'react';

export default function AuthCard({
  mode,
  email,
  password,
  loading,
  error,
  message,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onMagicLink,
  onOAuth,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isSignin = mode === 'signin';

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-extrabold text-purple-700 mb-1">Startups Directory</h1>
        </div>
        <div className="bg-white shadow-2xl rounded-2xl p-8 border border-gray-100">
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="bg-gray-50 border border-gray-200 rounded-full h-12 px-5 shadow-sm text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChange}
                required
                autoComplete="email"
                aria-label="Email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="bg-gray-50 border border-gray-200 rounded-full h-12 pl-5 pr-12 shadow-sm text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                placeholder={isSignin ? 'Enter your password' : 'Create a password'}
                value={password}
                onChange={onPasswordChange}
                required
                autoComplete={isSignin ? 'current-password' : 'new-password'}
                aria-label="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute inset-y-0 right-3 my-auto h-8 px-2 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-white/70 border border-gray-200 rounded-full"
                aria-pressed={showPassword}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {error && (
              <div role="alert" className="text-red-600 text-sm -mt-1">{error}</div>
            )}
            {message && (
              <div role="status" className="text-green-600 text-sm -mt-1">{message}</div>
            )}
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-full h-12 px-6 mt-2 transition-all"
            >
              {loading
                ? (isSignin ? 'Signing In…' : 'Signing Up…')
                : (isSignin ? 'Sign In with Password' : 'Sign Up')}
            </button>
          </form>
          {isSignin && (
            <a
              href="#"
              className="block mt-3 mb-3 text-right text-xs text-purple-500 hover:underline"
            >
              Forgot password?
            </a>
          )}
          <div className="flex flex-col gap-4 mt-4">
            {isSignin && (
              <button
                onClick={onMagicLink}
                className="w-full text-purple-600 font-semibold text-sm rounded-full h-12 transition-all border border-purple-200 hover:bg-purple-50"
                type="button"
                disabled={loading}
              >
                Login With Magic Link
              </button>
            )}
            <button
              onClick={() => onOAuth('google')}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold rounded-full h-12 px-6 shadow hover:bg-gray-50 flex items-center justify-center transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              type="button"
              disabled={loading}
            >
              <span className="inline-flex items-center">
                <GoogleIcon size={20} />
                <span className="ml-3">Continue with Google</span>
              </span>
            </button>
            <button
              onClick={() => onOAuth('github')}
              className="w-full bg-gray-900 text-white font-semibold rounded-full h-12 px-6 shadow hover:bg-gray-800 flex items-center justify-center transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              type="button"
              disabled={loading}
            >
              <span className="inline-flex items-center">
                <GithubIcon size={20} />
                <span className="ml-3">Continue with GitHub</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
