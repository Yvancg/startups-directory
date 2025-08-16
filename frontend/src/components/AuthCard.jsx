import GoogleIcon from '/src/components/icons/GoogleIcon.jsx';
import GithubIcon from '/src/components/icons/GithubIcon.jsx';
import { useState, useEffect, useRef } from 'react';

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
  onModeChange,
  onClose,
  title = 'Startups Directory',
  fixedHeight = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isSignin = mode === 'signin';
  const [extrasHeight, setExtrasHeight] = useState(0);
  const measureRef = useRef(null);

  const cardRef = useRef(null);

  useEffect(() => {
    // Focus the card when it mounts so it can capture keyboard events
    cardRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!measureRef.current) return;
    const el = measureRef.current;
    const ro = new ResizeObserver(() => {
      setExtrasHeight(el.offsetHeight || 0);
    });
    ro.observe(el);
    // Initialize
    setExtrasHeight(el.offsetHeight || 0);
    return () => ro.disconnect();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && onClose) {
      e.preventDefault();
      onClose();
      return;
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && onModeChange) {
      e.preventDefault();
      const next = e.key === 'ArrowLeft' ? 'signin' : 'signup';
      if (next !== mode) onModeChange(next);
    }
    // Enter submits naturally via the form; no extra handling needed.
  };

  // Hidden measurement block for Sign In extras (Forgot password + Magic Link)
  const measureExtras = (
    <div ref={measureRef} className="fixed -left-[9999px] top-0 w-[28rem]">
      <a
        href="#"
        className="block mt-3 mb-3 text-right text-xs text-purple-500"
        onClick={(e) => e.preventDefault()}
      >
        Forgot password?
      </a>
      <div className="flex flex-col gap-4 mt-4">
        <button className="w-full text-purple-600 font-semibold text-sm rounded-full h-12 border border-purple-200">
          Login With Magic Link
        </button>
      </div>
    </div>
  );

  return (
    <div className="authcard-modal-container flex items-center justify-center px-4">
      {measureExtras}
      <div className="w-full max-w-md">
        <div
          ref={cardRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="authcard-title"
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="relative bg-white shadow-2xl rounded-2xl p-8 border border-gray-100"
        >
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
          )}
          <h1 id="authcard-title" className="text-2xl font-extrabold text-purple-700 mt-4 mb-[30pt] text-center">{title}</h1>
          <div className="flex justify-center items-center mb-6">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button
                type="button"
                onClick={() => onModeChange && onModeChange('signin')}
                aria-pressed={isSignin}
                className={`px-4 py-1 text-sm font-semibold rounded-full transition-all ${
                  isSignin ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-purple-50'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => onModeChange && onModeChange('signup')}
                aria-pressed={!isSignin}
                className={`px-4 py-1 text-sm font-semibold rounded-full transition-all ${
                  !isSignin ? 'bg-purple-600 text-white shadow' : 'text-gray-700 hover:bg-purple-50'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>
          <form
            className="flex flex-col gap-5"
            onSubmit={e => {
              e.preventDefault();
              onSubmit && onSubmit(e);
            }}
          >
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
          {isSignin ? (
            <a
              href="#"
              className="block mt-3 mb-3 text-right text-xs text-purple-500 hover:underline"
              tabIndex={0}
              onClick={e => e.preventDefault()}
            >
              Forgot password?
            </a>
          ) : null}
          <div className="flex flex-col gap-4 mt-4">
            {isSignin ? (
              <button
                onClick={e => {
                  e.preventDefault();
                  onMagicLink && onMagicLink(e);
                }}
                className="w-full text-purple-600 font-semibold text-sm rounded-full h-12 transition-all border border-purple-200 hover:bg-purple-50"
                type="button"
                disabled={loading}
              >
                Login With Magic Link
              </button>
            ) : null}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-gray-400 font-medium text-sm">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={e => {
                e.preventDefault();
                onOAuth && onOAuth('google');
              }}
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
              onClick={e => {
                e.preventDefault();
                onOAuth && onOAuth('github');
              }}
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
        {fixedHeight && !isSignin && (
          <div style={{ height: extrasHeight || 0 }} className="invisible" aria-hidden="true">spacer</div>
        )}
      </div>
    </div>
  );
}
