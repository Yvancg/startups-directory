import { useState } from 'react';

export default function AuthCard({ mode = 'signin', onSubmit, error, onSwitchMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // You can add more state/fields if needed (e.g. password confirmation)
  return (
    <div className="w-full max-w-md mx-auto my-12">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-2">
          {/* Logo or Icon */}
          <span className="text-4xl" role="img" aria-label="rocket">🚀</span>
        </div>
        <h1 className="text-2xl font-extrabold text-purple-700 mb-1">Startup Directory</h1>
      </div>
      <div className="bg-white shadow-lg rounded-xl p-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => onSwitchMode('signin')}
            className={`px-6 py-2 rounded-t-lg font-semibold ${mode === 'signin' ? 'text-purple-700 border-b-4 border-purple-500' : 'text-gray-400'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => onSwitchMode('signup')}
            className={`px-6 py-2 rounded-t-lg font-semibold ${mode === 'signup' ? 'text-purple-700 border-b-4 border-purple-500' : 'text-gray-400'}`}
          >
            Sign Up
          </button>
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={e => {
            e.preventDefault();
            onSubmit({ email, password });
          }}
        >
          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="border border-gray-300 rounded-lg px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
              placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {mode === 'signin' && (
              <div className="mt-2 text-right">
                <button type="button" className="text-xs text-purple-500 hover:underline">Forgot password?</button>
              </div>
            )}
          </div>
          {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-4 py-2.5 mt-2 transition-all"
          >
            {mode === 'signin' ? 'Sign In with Password' : 'Sign Up'}
          </button>
        </form>
        {mode === 'signin' && (
          <button
            className="w-full mt-3 text-purple-600 font-semibold hover:underline text-sm"
            type="button"
          >
            Send Magic Link
          </button>
        )}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-xs font-medium">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button className="w-full bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2.5 shadow hover:bg-gray-50 flex items-center justify-center gap-2 transition-all">
          {/* Add Google SVG icon here */}
          <span className="ml-1">Continue with Google</span>
        </button>
        <div className="mt-5 text-center text-gray-500 text-sm">
          {mode === 'signin' ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-purple-600 hover:underline font-semibold"
                onClick={() => onSwitchMode('signup')}
              >Sign up</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-purple-600 hover:underline font-semibold"
                onClick={() => onSwitchMode('signin')}
              >Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
