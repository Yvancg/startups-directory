import { useAuth } from '../AuthProvider';
import { useNavigate, useLocation } from 'react-router-dom';

// TEMP fallback if LogoutButton is missing
function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
      className="text-white bg-purple-600 px-4 py-1 rounded hover:bg-purple-700 transition"
    >
      Logout
    </button>
  );
}

export default function Navbar() {
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button
          className="font-extrabold text-lg sm:text-xl tracking-tight text-purple-700 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          Startup Directory
        </button>

        <div className="flex items-center gap-2">
          {!session ? (
            <>
              <button
                onClick={() => navigate('/login')}
                aria-current={isLogin ? 'page' : undefined}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm border',
                  isLogin
                    ? 'bg-purple-600 text-white border-transparent hover:bg-purple-700'
                    : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50'
                ].join(' ')}
              >
                Sign In
              </button>

              <button
                onClick={() => navigate('/signup')}
                aria-current={isSignup ? 'page' : undefined}
                className={[
                  'rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm border',
                  isSignup
                    ? 'bg-purple-600 text-white border-transparent hover:bg-purple-700'
                    : 'bg-white text-purple-600 border-purple-200 hover:bg-purple-50'
                ].join(' ')}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <span className="hidden sm:inline text-gray-600 mr-2">{session?.user?.email || 'Account'}</span>
              <button
                onClick={logout}
                className="rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm bg-purple-600 text-white hover:bg-purple-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
