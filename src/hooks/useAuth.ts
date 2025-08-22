import { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for development
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Uncomment below to simulate logged in user
      // setUser({
      //   id: '1',
      //   email: 'user@example.com',
      //   name: 'Test User',
      //   created_at: '2024-01-01'
      // });
    }, 1000);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock sign in
    console.log('Mock sign in:', email, password);
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Mock sign up
    console.log('Mock sign up:', email, password, name);
    return { error: null };
  };

  const signOut = async () => {
    // Mock sign out
    console.log('Mock sign out');
    setUser(null);
    return { error: null };
  };

  return { user, loading, signIn, signUp, signOut };
}