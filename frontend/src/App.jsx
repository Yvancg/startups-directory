import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './AuthProvider';
import AuthPage from './components/AuthPage';
import AdminStartupCRUD from './components/AdminStartupCRUD';

function Home() {
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome!</h1>
      <p>Dashboard coming soon for your role.</p>
    </div>
  );
}

function App() {
  const { session, userRole } = useAuth();
  const RequireAuth = ({ children }) =>
    !session ? <Navigate to="/login" replace /> : children;

  const RequireGuest = ({ children }) =>
    session ? <Navigate to="/" replace /> : children;

  const RequireAdmin = ({ children }) =>
    !session ? (
      <Navigate to="/login" replace />
    ) : userRole === 'admin' ? (
      children
    ) : (
      <Navigate to="/" replace />
    );
  console.log('session:', session, 'userRole:', userRole);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 grid place-items-center px-4 py-8">
          <div className="w-full max-w-4xl">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    {userRole === 'admin' ? <AdminStartupCRUD /> : <Home />}
                  </RequireAuth>
                }
              />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminStartupCRUD />
                  </RequireAdmin>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireGuest>
                    <AuthPage mode="signin" />
                  </RequireGuest>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequireGuest>
                    <AuthPage mode="signup" />
                  </RequireGuest>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
