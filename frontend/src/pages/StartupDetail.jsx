import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function StartupDetail() {
  const { id } = useParams();
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('startups')
        .select('*')
        .eq('id', id)
        .single();
      if (!cancelled) {
        if (error) console.warn('Load startup error:', error.message);
        setStartup(data);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (!startup) {
    return <div className="bg-white rounded-2xl shadow p-8 text-gray-500">Loading…</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow p-8">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gray-100 grid place-items-center overflow-hidden">
          {startup.logo ? <img src={startup.logo} alt={startup.name} className="h-16 w-16 object-cover" /> : <span className="text-gray-500 font-semibold">{startup.name?.[0]}</span>}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{startup.name}</h1>
          <p className="text-sm text-gray-500">{startup.team_size || '—'}</p>
          <p className="text-sm text-gray-500">{startup.country || '—'}</p>
        </div>
      </div>

      <p className="mt-6 text-gray-700 whitespace-pre-line">{startup.description || 'No description provided.'}</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <Info label="Website" value={startup.website} />
        <Info label="Business Model" value={startup.business_model_type} />
        <Info label="Founded" value={startup.founded_date} />
        <Info label="Industries" value={startup.industries} />
        <Info label="Email" value={startup.email} />
        <Info label="Phone" value={startup.phone_number} />
        <Info label="Country" value={startup.country} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div className="text-gray-500">{label}</div>
      <div className="text-gray-800 break-words">{value || '—'}</div>
    </div>
  );
}
