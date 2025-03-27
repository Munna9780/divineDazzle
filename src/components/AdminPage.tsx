import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminProductForm from './AdminProductForm';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      setError('Check your email for the confirmation link');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      setIsAuthenticated(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid login credentials');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3498DB]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#ECF0F1] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Admin Access</h2>
            
            {error && (
              <div className="mb-4 p-4 text-sm rounded-lg bg-red-100 text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50]">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3498DB] focus:ring focus:ring-[#3498DB] focus:ring-opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#3498DB] text-white py-3 px-6 rounded-lg hover:bg-[#2980B9] transition-colors"
              >
                Sign In
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={handleSignUp}
                  className="text-[#3498DB] hover:text-[#2980B9]"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECF0F1] py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E50]">Admin Dashboard</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
        <AdminProductForm />
      </div>
    </div>
  );
}