import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function AdminStartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    async function fetchStartups() {
      const { data, error } = await supabase.from('startups').select('*');
      if (error) console.error(error);
      else setStartups(data);
    }

    fetchStartups();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Startups</h2>
      <ul>
        {startups.map((startup) => (
          <li key={startup.id} className="mb-2">
            <strong>{startup.name}</strong> — {startup.team_size || 'Unknown'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminStartupList;
