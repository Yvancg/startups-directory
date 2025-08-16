// frontend/src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import LogoutButton from './LogoutButton';

export default function Navbar() {
  const { session, userRole } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          className="font-extrabold text-lg sm:text-xl tracking-tight text-purple-700 flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          Startups Directory
        </button>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {!session ? (
            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm border bg-white text-purple-600 border-purple-200 hover:bg-purple-50"
              onClick={() => navigate('/?auth=signin')}
            >
              Sign In / Sign Up
            </button>
          ) : (
            <>
              <span className="hidden sm:inline text-gray-600 mr-2">
                {session?.user?.email || 'Account'}
              </span>

              {userRole === 'admin' && (
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm bg-gray-100 text-gray-800 hover:bg-gray-200 mr-2"
                >
                  Admin Dashboard
                </button>
              )}

              <LogoutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
