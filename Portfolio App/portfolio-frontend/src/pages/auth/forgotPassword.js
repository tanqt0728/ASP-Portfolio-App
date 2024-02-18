import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      alert(
        "If an account with that email exists, we have sent you an email to reset your password."
      );
    } catch (error) {
      alert("Failed to send reset password email");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}
