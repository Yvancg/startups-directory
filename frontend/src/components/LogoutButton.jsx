import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); // Or use router redirect for SPA
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}