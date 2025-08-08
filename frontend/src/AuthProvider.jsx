import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole(data?.role || null);
      } else {
        setUserRole(null);
      }
    });
    // Initial load
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', session.user.id)
          .single();
        setUserRole(data?.role || null);
      }
    })();
    return () => authListener.subscription.unsubscribe();
  }, []);

  // Helper logout
  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ session, userRole, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
