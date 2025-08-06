// frontend/src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tziqifersmwisrjxxqrj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6aXFpZmVyc213aXNyanh4cXJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzNDMxNjMsImV4cCI6MjA2MTkxOTE2M30.hZY4dxtxQBjRgY6tefpeyBZrxXqbvBRZC6EPX0inTi4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
