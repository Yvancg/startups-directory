// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// Persistent layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages / screens
import Home from './pages/Home';
import StartupDetail from './pages/StartupDetail';
import AdminStartupCRUD from './components/AdminStartupCRUD';
import StartupForm from './components/StartupForm';

export default function App() {
  const { session, userRole } = useAuth();

  const RequireAuth = ({ children }) =>
    !session ? <Navigate to="/login" replace /> : children;

  const RequireAdmin = ({ children }) =>
    !session ? (
      <Navigate to="/login" replace />
    ) : userRole === 'admin' ? (
      children
    ) : (
      <Navigate to="/" replace />
    );

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />

        <main className="flex-1 grid place-items-center px-4 py-8">
          <div className="w-full max-w-6xl">
            <Routes>
              {/* PUBLIC home */}
              <Route path="/" element={<Home />} />

              {/* Protected pages */}
              <Route
                path="/startups/:id"
                element={
                  <RequireAuth>
                    <StartupDetail />
                  </RequireAuth>
                }
              />

              <Route
                path="/startups/new"
                element={
                  <RequireAuth>
                    <StartupForm />
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

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
