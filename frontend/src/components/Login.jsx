import { supabase } from '../lib/supabaseClient';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage('Signed in successfully!');
  }

  async function handleOAuth(provider) {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) setError(error.message);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Sign In to Startup Directory</h2>
        <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-5">
          <input
            type="email"
            required
            placeholder="Email address"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full transition-all"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full transition-all"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg px-4 py-2.5 shadow disabled:bg-blue-300"
          >
            {loading ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>
        <div className="my-6 w-full flex items-center">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-gray-400 text-xs font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="w-full flex flex-col gap-4">
          <button
            onClick={() => handleOAuth('google')}
            className="bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2.5 shadow hover:bg-gray-50 flex items-center justify-center gap-2 transition-all"
          >
            {/* Google Icon */}
            <svg width={20} height={20} viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.8c-1.6 4.7-6 8-11.8 8-7 0-12.7-5.7-12.7-12.5S17 11.5 24 11.5c3.1 0 5.9 1.1 8.1 2.9l6.2-6C34.2 4.8 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.2-7.4 19.2-21 0-1.3-.1-2.5-.3-3.7z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.6 17.2 19.5 14.5 24 14.5c3.1 0 5.9 1.1 8.1 2.9l6.2-6C34.2 4.8 29.4 3 24 3 15.5 3 8.1 8.5 6.3 14.7z"/><path fill="#FBBC05" d="M24 44.5c5.4 0 10.2-1.8 14-4.9l-6.6-5.4c-2.2 1.5-5 2.4-7.4 2.4-5.8 0-10.2-3.3-11.8-8H6.3c2.5 6.2 9.5 10.9 17.7 10.9z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-1.1 3.2-4.4 5.5-8.8 5.5-5.8 0-10.2-3.3-11.8-8H6.3c2.1 5.3 7.7 9.5 13.7 9.5 6.8 0 12.1-5.1 12.1-12.1 0-.8-.1-1.5-.2-2.2z"/></g></svg>
            Sign in with Google
          </button>
          <button
            onClick={() => handleOAuth('github')}
            className="bg-gray-900 text-white font-semibold rounded-lg px-4 py-2.5 shadow hover:bg-gray-800 flex items-center justify-center gap-2 transition-all"
          >
            {/* GitHub Icon */}
            <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.61.5.5 5.68.5 12.14c0 5.14 3.28 9.47 7.84 11 .57.1.78-.25.78-.56 0-.27-.01-1.16-.01-2.1-3.19.69-3.87-1.38-3.87-1.38-.51-1.31-1.24-1.66-1.24-1.66-1.02-.68.08-.66.08-.66 1.13.08 1.72 1.15 1.72 1.15 1 .1 1.59 1.43 1.59 1.43.9 1.55 2.36 1.1 2.93.84.09-.65.36-1.1.65-1.35-2.55-.29-5.23-1.29-5.23-5.76 0-1.27.45-2.31 1.19-3.12-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 012.9-.39c.99.01 1.98.14 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.12 0 4.48-2.68 5.47-5.23 5.76.37.33.7.98.7 1.97 0 1.42-.01 2.57-.01 2.92 0 .31.21.67.79.56C20.72 21.6 24 17.27 24 12.14 24 5.68 18.89.5 12 .5z"/></svg>
            Sign in with GitHub
          </button>
        </div>
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
        {message && <div className="text-green-600 mt-4 text-center">{message}</div>}
      </div>
    </div>
  );
}

// Note: This component uses Supabase for authentication. Make sure to set up your Supabase project and configure the auth providers in the Supabase dashboard.
// The email login will send a magic link to the user's email, while OAuth buttons allow login via Google and GitHub.
// Ensure you have the necessary environment variables set up for Supabase in your project (e.g., `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`).
// You can customize the styles and icons as needed to match your application's design