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
                  !session ? (
                    <Navigate to="/login" replace />
                  ) : userRole === 'admin' ? (
                    <AdminStartupCRUD />
                  ) : (
                    <Home />
                  )
                }
              />
              <Route path="/login" element={<AuthPage mode="signin" />} />
              <Route path="/signup" element={<AuthPage mode="signup" />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
