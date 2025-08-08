import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthCard from './AuthCard';

export default function AuthPage() {
  const location = useLocation();
  const [mode, setMode] = useState('signin'); // default

  // Sync mode to route
  useEffect(() => {
    if (location.pathname === '/signup') setMode('signup');
    else setMode('signin');
  }, [location.pathname]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) setError(error.message);
      else setMessage('Account created! Check your email to verify.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) setError(error.message);
      else {
        setMessage('Logged in!');
        navigate('/');
      }
    }
  }

  async function handleOAuth(provider) {
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function handleMagicLink(e) {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });
    setLoading(false);
    if (error) setError(error.message);
    else setMessage('Check your email for the magic link!');
  }

  return (
    <AuthCard
      mode={mode}
      email={email}
      password={password}
      loading={loading}
      error={error}
      message={message}
      onEmailChange={e => setEmail(e.target.value)}
      onPasswordChange={e => setPassword(e.target.value)}
      onSubmit={handleSubmit}
      onMagicLink={handleMagicLink}
      onOAuth={handleOAuth}
    />
  );
}
