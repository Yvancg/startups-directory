import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    console.log('[LogoutButton] click');
    try {
      if (typeof logout === 'function') {
        await logout();
        console.log('[LogoutButton] context logout() resolved');
      } else {
        await supabase.auth.signOut();
        console.log('[LogoutButton] supabase.auth.signOut() fallback resolved');
      }
    } catch (err) {
      console.warn('[LogoutButton] logout error:', err);
    } finally {
      setLoading(false);
      navigate('/login', { replace: true });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      aria-busy={loading}
      className="rounded-full px-4 py-2 text-sm font-semibold transition shadow-sm bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? 'Logging out…' : 'Logout'}
    </button>
  );
}
