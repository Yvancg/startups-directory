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
  function GoogleIcon() {
    return (
      <svg width={20} height={20} fill="currentColor" viewBox="0 0 48 48">
        <path d="M44.5 20H24v8.5h11.8c-1.6 4.7-6 8-11.8 8-7 0-12.7-5.7-12.7-12.5S17 11.5 24 11.5c3.1 0 5.9 1.1 8.1 2.9l6.2-6C34.2 4.8 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.2-7.4 19.2-21 0-1.3-.1-2.5-.3-3.7z" />
      </svg>
    );
  }
  function GithubIcon() {
    return (
      <svg width={20} height={20} fill="currentColor" viewBox="0 0 24 24" className="mr-3">
        <path d="M12 .5C5.61.5.5 5.68.5 12.14c0 5.14 3.28 9.47 7.84 11 .57.1.78-.25.78-.56 0-.27-.01-1.16-.01-2.1-3.19.69-3.87-1.38-3.87-1.38-.51-1.31-1.24-1.66-1.24-1.66-1.02-.68.08-.66.08-.66 1.13.08 1.72 1.15 1.72 1.15 1 .1 1.59 1.43 1.59 1.43.9 1.55 2.36 1.1 2.93.84.09-.65.36-1.1.65-1.35-2.55-.29-5.23-1.29-5.23-5.76 0-1.27.45-2.31 1.19-3.12-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a10.9 10.9 0 012.9-.39c.99.01 1.98.14 2.9.39 2.2-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.12 0 4.48-2.68 5.47-5.23 5.76.37.33.7.98.7 1.97 0 1.42-.01 2.57-.01 2.92 0 .31.21.67.79.56C20.72 21.6 24 17.27 24 12.14 24 5.68 18.89.5 12 .5z"/>
      </svg>
    );
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-2">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-extrabold text-purple-700 mb-1">Startup Directory</h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-8">
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <div>
              <input
                type="email"
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={onEmailChange}
                required
                autoComplete="email"
              />
            </div>
            <div>
              <input
                type="password"
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm px-4 py-3 text-base w-full focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all"
                placeholder={mode === 'signin' ? 'Enter your password' : 'Create a password'}
                value={password}
                onChange={onPasswordChange}
                required
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              />
              {mode === 'signin' && (
                <div className="mt-2 text-right">
                  <button type="button" className="text-xs text-purple-500 hover:underline">Forgot password?</button>
                </div>
              )}
            </div>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            {message && <div className="text-green-600 text-sm mb-2">{message}</div>}
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-4 py-2.5 mt-2 transition-all"
            >
              {loading
                ? (mode === 'signup' ? 'Signing Up...' : 'Signing In...')
                : (mode === 'signin' ? 'Sign In with Password' : 'Sign Up')}
            </button>
          </form>
          {mode === 'signin' && (
            <button
              onClick={onMagicLink}
              className="w-full mt-3 text-purple-600 font-semibold hover:underline text-sm"
              type="button"
              disabled={loading}
            >
              Login With Magic Link
            </button>
          )}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-xs font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => onOAuth('google')}
              className="w-full bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg px-4 py-2.5 shadow hover:bg-gray-50 flex items-center justify-center gap-2 transition-all text-black"
              type="button"
              disabled={loading}
            >
              <GoogleIcon className="mr-3" /> <span> Continue with Google</span>
            </button>
            <button
              onClick={() => onOAuth('github')}
              className="w-full bg-gray-900 text-white font-semibold rounded-lg px-4 py-2.5 shadow hover:bg-gray-800 flex items-center justify-center gap-2 transition-all"
              type="button"
              disabled={loading}
            >
              <GithubIcon /> <span> Continue with GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
