import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function AdminStartupList() {
  const [startups, setStartups] = useState([]);

  useEffect(() => {
    async function fetchStartups() {
        const { data, error } = await supabase.from('startups').select('*');

        console.log('Raw data:', data);
        console.log('Error (if any):', error);

        if (error) {
        alert("Error loading startups: " + error.message);
        } else {
        setStartups(data);
        }
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
