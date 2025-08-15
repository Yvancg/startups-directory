import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { supabase } from '../lib/supabaseClient';
import AuthCard from './AuthCard';

export default function AuthModal({ open, mode = 'signin', onClose, onSuccess }) {
  const [mounted, setMounted] = useState(false);

  // Local auth UI state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Close modal on successful auth
  useEffect(() => {
    setMounted(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) {
        onSuccess?.();
        onClose?.();
      }
    });
    return () => subscription?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Clear messages when mode changes or modal opens
    if (open) {
      setError('');
      setMessage('');
    }
  }, [open, mode]);

  if (!open || !mounted) return null;

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // onAuthStateChange will close modal and call onSuccess
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage('Account created! Please check your email to verify.');
      }
    } catch (err) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e?.preventDefault?.();
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      setMessage('Magic link sent! Check your email.');
    } catch (err) {
      setError(err?.message || 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider) => {
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
      // OAuth will redirect; on return onAuthStateChange handles closing
    } catch (err) {
      setError(err?.message || 'OAuth sign-in failed');
      setLoading(false);
    }
  };

  const handleClose = () => onClose?.();

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* Dialog */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <div className="w-full max-w-md">
          <div className="relative">
            <button
              className="absolute -top-10 right-0 bg-white/80 text-gray-700 text-sm rounded-full px-3 py-1 shadow hover:bg-white"
              onClick={handleClose}
              type="button"
            >
              Close
            </button>
          </div>

          <AuthCard
            mode={mode}
            email={email}
            password={password}
            loading={loading}
            error={error}
            message={message}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            onMagicLink={handleMagicLink}
            onOAuth={handleOAuth}
            providers={['google', 'github']}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
