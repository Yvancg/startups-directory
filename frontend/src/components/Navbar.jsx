import LogoutButton from './LogoutButton';
import { useAuth } from '../AuthProvider';

export default function Navbar() {
  const { session } = useAuth();

  return (
    <nav className="bg-white shadow flex items-center justify-between px-8 py-4">
      <div className="font-extrabold text-xl tracking-tight text-blue-700 flex items-center gap-2">
        <span role="img" aria-label="rocket">🚀</span> Startup Directory
      </div>
      {session && <LogoutButton />}
    </nav>
  );
}