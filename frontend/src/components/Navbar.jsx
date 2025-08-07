import LogoutButton from './LogoutButton';
import { useAuth } from '../AuthProvider';

export default function Navbar() {
  const { session } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-100 border-b">
      <div className="font-bold text-lg">Startup Directory</div>
      {session && <LogoutButton />}
    </nav>
  );
}