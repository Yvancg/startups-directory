import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import StartupForm from './StartupForm';

export default function AdminStartupCRUD() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editStartup, setEditStartup] = useState(null);

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
    setEditStartup(null);
  }

  function handleEdit(startup) {
    setEditStartup(startup);
    setShowForm(true);
  }

  async function handleDelete(startup) {
    if (!window.confirm(`Delete "${startup.name}"?`)) return;
    const { error } = await supabase.from('startups').delete().eq('id', startup.id);
    if (error) alert(error.message);
    fetchStartups();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold text-blue-700">All Startups</h2>
        <button
          onClick={() => { setShowForm(true); setEditStartup(null); }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-5 py-2 shadow transition"
        >
          + Add New Startup
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <StartupForm
            startup={editStartup}
            onCreated={handleCreated}
            onCancel={() => { setShowForm(false); setEditStartup(null); }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center text-gray-500 py-10">Loading...</div>
      ) : startups.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center text-gray-500">No startups yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {startups.map((s) => (
            <div
              key={s.id}
              className="bg-white shadow rounded-2xl p-6 flex flex-col gap-3 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue-800">{s.name}</h3>
                <span className={`px-2 py-1 text-xs rounded ${s.status === 'approved' ? 'bg-green-100 text-green-700' : s.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{s.status}</span>
              </div>
              <div className="text-gray-700">{s.description || <span className="italic text-gray-400">No description.</span>}</div>
              <div className="flex flex-wrap gap-2 text-xs mt-2">
                {s.industries?.split(',').map(ind => <span key={ind} className="bg-blue-100 text-blue-700 px-2 py-1 rounded">{ind.trim()}</span>)}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded px-3 py-1 font-semibold"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 font-semibold"
                  onClick={() => handleDelete(s)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
