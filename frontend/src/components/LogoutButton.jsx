import { useAuth } from '../AuthProvider';

export default function LogoutButton() {
  const { logout } = useAuth(); // Use logout helper from context

  return (
    <button
      onClick={logout}
      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-4 py-2 font-semibold ml-4"
    >
      Logout
    </button>
  );
}
