// frontend/src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import StartupGrid from '../components/StartupGrid';
import AuthModal from '../components/AuthModal';

export default function Home() {
  const { session } = useAuth();
  const navigate = useNavigate();

  // Auth modal state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [pending, setPending] = useState(null); // { type: 'detail'|'new', startupId? }

  // Query param -> open modal when navbar sends /?auth=signin|signup
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const a = searchParams.get('auth');
    if (a === 'signin' || a === 'signup') {
      setAuthMode(a);
      setAuthOpen(true);
    } else if (!pending) {
      // Only close automatically if we are not in the middle of a post-auth action
      setAuthOpen(false);
    }
  }, [searchParams, pending]);

  const closeAuth = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('auth');
    setSearchParams(next, { replace: true });
    setAuthOpen(false);
  };

  // Gate actions that require auth
  const requireAuth = (action) => {
    if (session) {
      action();
    } else {
      // For direct actions from Home (not via navbar), default to signin
      setPending(null);
      setAuthMode('signin');
      setAuthOpen(true);
    }
  };

  // "Register Your Startup" CTA
  const handleRegisterClick = () => {
    requireAuth(() => navigate('/startups/new'));
    if (!session) setPending({ type: 'new' });
  };

  // Card click -> detail
  const handleOpenDetail = (s) => {
    const go = () => navigate(`/startups/${s.id}`);
    if (session) return go();
    setPending({ type: 'detail', startupId: s.id });
    setAuthMode('signin');
    setAuthOpen(true);
  };

  const handleAuthSuccess = () => {
    if (!pending) return;

    if (pending.type === 'new') {
      navigate('/startups/new');
    } else if (pending.type === 'detail' && pending.startupId) {
      navigate(`/startups/${pending.startupId}`);
    }

    setPending(null);

    // Clear the ?auth param after success if it exists
    const next = new URLSearchParams(searchParams);
    if (next.has('auth')) {
      next.delete('auth');
      setSearchParams(next, { replace: true });
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-16">
      {/* Hero */}
      <section className="text-center py-10 md:py-14">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Thailand <span className="text-gray-800">Startups Directory</span>
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          Discover innovative startups across Thailand. Connect with founders, explore industries, and be part of the growing ecosystem.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            className="rounded-full px-5 py-3 text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 shadow"
            onClick={handleRegisterClick}
          >
            Register Your Startup
          </button>
          <button
            type="button"
            className="rounded-full px-5 py-3 text-sm font-semibold bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm"
            onClick={() => navigate('/industries')}
          >
            Explore Industries
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-500">Featuring 500+ startups across 20+ industries</p>

        {/* Search (non-functional placeholder for now) */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 shadow-sm px-4 py-3">
            <input
              type="text"
              placeholder="Search startups by name, industry, or keyword…"
              className="flex-1 outline-none text-gray-700 placeholder:text-gray-400"
            />
            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Grid */}
      <StartupGrid onOpenDetail={handleOpenDetail} />

      {/* Auth modal (single instance, driven by state + query param) */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={closeAuth}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
