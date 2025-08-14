import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
          if (error) {
            console.warn('users.role fetch error:', error.message);
            setUserRole(null);
          } else {
            setUserRole(data?.role || null);
          }
        } catch (err) {
          console.warn('users.role fetch threw:', err);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
    });

    // Initial load
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        try {
          const { data, error } = await supabase
            .from('users')
            .select('role')
            .eq('id', session.user.id)
            .single();
          if (error) {
            console.warn('users.role fetch error (initial):', error.message);
            setUserRole(null);
          } else {
            setUserRole(data?.role || null);
          }
        } catch (err) {
          console.warn('users.role fetch threw (initial):', err);
          setUserRole(null);
        }
      }
    })();

    return () => subscription?.unsubscribe();
  }, []);

  // Helper logout (optimistic): clear local state first, then sign out in background
  const logout = async () => {
    // Optimistically clear so UI updates immediately
    setSession(null);
    setUserRole(null);

    try {
      const signOut = supabase.auth.signOut();
      // Prevent hanging UI if the network is slow: race against a short timeout
      await Promise.race([
        signOut,
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    } catch (err) {
      console.warn('signOut error:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ session, userRole, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
