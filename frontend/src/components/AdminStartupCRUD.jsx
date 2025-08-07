import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function AdminStartupCRUD() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStartups();
  }, []);

  async function fetchStartups() {
    setLoading(true);
    const { data, error } = await supabase.from('startups').select('*');
    if (error) console.error(error);
    else setStartups(data);
    setLoading(false);
  }

  // Placeholder: next add Create/Edit/Delete UI

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Startups (Admin)</h2>
      {loading ? <div>Loading...</div> : (
        <ul>
          {startups.map(s => (
            <li key={s.id} className="mb-2">
              <strong>{s.name}</strong> — {s.team_size || 'Unknown'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}