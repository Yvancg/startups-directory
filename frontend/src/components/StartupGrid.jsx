import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import StartupCard from './StartupCard';

export default function StartupGrid({ onOpenDetail }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const withTimeout = (p, ms = 8000) =>
      Promise.race([
        p,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
        ),
      ]);

    const load = async () => {
      if (!cancelled) {
        setLoading(true);
        setErrorMsg(null);
      }
      try {
        const { data, error } = await withTimeout(
          supabase
            .from('startups')
            .select('id, name, logo, team_size, business_model_type, description, country')
            .order('name', { ascending: true })
            .limit(24),
          8000
        );
        if (error) throw error;
        if (!cancelled) setRows(data || []);
      } catch (err) {
        console.warn('Load startups error:', err?.message || err);
        if (!cancelled) {
          setErrorMsg(err?.message || 'Failed to load startups.');
          setRows([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10" aria-busy="true">
        Loading startups…
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-8 text-center">
        <p className="text-sm text-red-600 mb-4" role="alert">
          {errorMsg}
        </p>
        <button
          onClick={() => location.reload()}
          className="rounded-full px-5 h-11 font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!rows.length) {
    return <div className="text-center text-gray-500 py-10">No startups yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {rows.map((s) => (
        <StartupCard
          key={s.id}
          startup={s}
          onClick={() => onOpenDetail?.(s)}
        />
      ))}
    </div>
  );
}
