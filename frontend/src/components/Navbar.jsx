import { useAuth } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
      <div
        className="font-extrabold text-xl tracking-tight text-purple-700 flex items-center gap-2 cursor-pointer"
        onClick={() => navigate('/')}
      >
        <span role="img" aria-label="rocket">🚀</span> Startup Directory
      </div>
      <div className="flex items-center gap-2">
        {!session ? (
          <>
            <button
              className="text-purple-600 font-semibold hover:underline px-4 py-1 rounded transition"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
            <button
              className="bg-purple-600 text-white font-semibold px-4 py-1 rounded hover:bg-purple-700 transition"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            {/* Optionally, show user email/avatar */}
            <span className="text-gray-600 mr-4">{session.user?.email}</span>
            <LogoutButton />
          </>
        )}
      </div>
    </nav>
  );
}
