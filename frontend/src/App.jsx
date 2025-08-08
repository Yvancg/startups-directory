import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useAuth } from './AuthProvider';
import LoginPage from './components/LoginPage'; // new!
import SignupPage from './components/SignupPage'; // new!
import AdminStartupCRUD from './components/AdminStartupCRUD';

function Home() {
  // You can customize this welcome/dashboard for users who are not admin
  return (
    <div className="bg-white rounded-2xl shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Welcome!</h1>
      <p>Dashboard coming soon for your role.</p>
    </div>
  );
}

function App() {
  const { session, userRole } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <Navbar />
        <main className="max-w-4xl mx-auto py-10 px-4">
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
