import Navbar from './components/Navbar';
import { useAuth } from './AuthProvider';
import Login from './components/Login';
import AdminStartupCRUD from './components/AdminStartupCRUD';

function App() {
  const { session, userRole } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-10 px-4">
        {!session ? (
          <div className="flex flex-col items-center mt-16">
            <h1 className="text-3xl font-extrabold mb-4 text-blue-700">Startup Directory</h1>
            <Login />
          </div>
        ) : userRole === 'admin' ? (
          <AdminStartupCRUD />
        ) : (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome!</h1>
            <p>Dashboard coming soon for your role.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
