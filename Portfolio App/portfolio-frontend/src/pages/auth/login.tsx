import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CryptoJS from 'crypto-js'; // Import CryptoJS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error: authError } = useAuth(); // Assuming useAuth also provides access to any auth related errors.
  const router = useRouter();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Hash the password before sending it
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

    // Use the hashed password for login
    try {
      const success = await login(email, hashedPassword);
      if (success) {
        alert('Login successful! Redirecting...'); // Notify user
        router.push('/'); // Adjust the redirect route as needed
      } else {
        setLocalError(authError || 'Failed to log in. Please check your credentials.');
      }
    } catch (error) {
      setLocalError('Failed to log in. Please check your credentials.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {localError && <p className="mb-4 text-red-500">{localError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">Login</button>
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link href="/auth/signup" className="text-sm text-blue-600 hover:underline"> 
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
