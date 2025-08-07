import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import StartupForm from './StartupForm';

export default function AdminStartupCRUD() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingStartup, setEditingStartup] = useState(null);

  useEffect(() => {
    fetchStartups();
  }, []);

  async function fetchStartups() {
    setLoading(true);
    const { data, error } = await supabase.from('startups').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    else setStartups(data);
    setLoading(false);
  }

  function handleCreated() {
    fetchStartups();
    setShowForm(false);
    setEditingStartup(null);
  }

  function handleEditClick(startup) {
    setEditingStartup(startup);
    setShowForm(true);
  }

  async function handleDeleteClick(startup) {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${startup.name}"?`);
    if (!confirmDelete) return;

    const { error } = await supabase.from('startups').delete().eq('id', startup.id);
    if (error) {
      console.error('Error deleting startup:', error);
      alert('Failed to delete startup. Please try again.');
    } else {
      fetchStartups();
    }
  }

  function handleCancel() {
    setShowForm(false);
    setEditingStartup(null);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Startups (Admin)</h2>
      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setEditingStartup(null);
          }}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded"
        >
          Add New Startup
        </button>
      )}

      {showForm && (
        <StartupForm
          startup={editingStartup}
          onCreated={handleCreated}
          onCancel={handleCancel}
        />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {startups.map((s) => (
            <li key={s.id} className="mb-2 flex items-center space-x-4">
              <span className="flex-1">
                <strong>{s.name}</strong> — {s.team_size || 'Unknown'}
              </span>
              <button
                onClick={() => handleEditClick(s)}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(s)}
                className="px-2 py-1 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}