import { useAuth } from './AuthProvider';
import Login from './components/Login';
import AdminStartupList from './components/AdminStartupList';

function App() {
  const { session } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Startup Directory</h1>
      {!session ? <Login /> : <AdminStartupList />}
    </div>
  );
}

export default App;
