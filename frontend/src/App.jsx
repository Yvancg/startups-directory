import { useAuth } from './AuthProvider';
import Navbar from './components/Navbar';
import Login from './components/Login';
import AdminStartupCRUD from './components/AdminStartupCRUD';
// import StartupOwnerDashboard from './components/StartupOwnerDashboard';
// import PublicUserDashboard from './components/PublicUserDashboard';

function App() {
  const { session, userRole } = useAuth();

  if (!session) return <Login />;

  if (userRole === 'admin') {
    return (
      <>
        <Navbar />
        <div className="p-4">
          <h1>Admin Dashboard</h1>
          <AdminStartupCRUD />
          {/* Add admin-specific components here */}
        </div>
      </>
    );
  }

  if (userRole === 'startup') {
    return (
      <>
        <Navbar />
        <div className="p-4">
          <h1>Startup Owner Dashboard</h1>
          {/* <StartupOwnerDashboard /> */}
        </div>
      </>
    );
  }

  // Default: public user
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1>User Dashboard</h1>
        {/* <PublicUserDashboard /> */}
      </div>
    </>
  );
}

export default App;
