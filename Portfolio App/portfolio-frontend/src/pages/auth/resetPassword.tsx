import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const { resetPassword } = useAuth();
  const router = useRouter();
  const { token } = router.query; // Assuming the URL includes a ?token=<TOKEN> parameter

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || typeof token !== 'string') {
      alert('Token is invalid or expired');
      return;
    }
    try {
      await resetPassword(password, token);
      alert('Your password has been reset successfully');
      router.push('/auth/login');
    } catch (error) {
      alert('Failed to reset password');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New Password"
          required
        />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}
