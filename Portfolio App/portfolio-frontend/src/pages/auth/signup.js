import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import PageHeading from "../../components/PageHeading";
import Div from "../../components/Div";
import Spacing from "../../components/Spacing";
import Button from "../../components/Button";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const success = await signup(
        email,
        password,
        fullName,
        dob,
        contactNumber,
        location
      );
      alert(success);

      if (success) {
        toast.success("Sign Up successful! Redirecting...");
        router.push("/auth/login");
      } else {
        // If not successful, setError is already called in signup function with appropriate message
        setLoading(false); // Ensure loading is false
      }
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up - Portfolify </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PageHeading bgSrc="/images/search_banner.png" />
        <Spacing lg="30" md="20" />
        <Div className="auth-container cs-radius_7">
          <h2>Sign Up</h2>
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <Div className="cs-auth_input_container">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="cs-auth_input"
              />
            </Div>
            <Div className="cs-auth_input_container">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="cs-auth_input"
              />
            </Div>
            <Div className="cs-auth_input_container">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Comfirm password"
                required
                className="cs-auth_input"
              />
            </Div>
            <div className="cs-auth_input_container">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                required
                className="cs-auth_input"
              />
            </div>

            <div className="cs-auth_input_container">
              <label
                htmlFor="dob"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="cs-auth_input"
              />
            </div>

            <div className="cs-auth_input_container">
              <label
                htmlFor="contactNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Your contact number"
                required
                className="cs-auth_input"
              />
            </div>
            <div className="cs-auth_input_container">
              <label
                htmlFor="contactNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your location"
                required
                className="cs-auth_input"
              />
            </div>
            <Div className="cs-auth_button_container">
              <button
                type="submit"
                disabled={loading}
                className="cs-btn cs-style1 cs-auth_button"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </Div>
          </form>
          <Div className="cs-auth_signup_prompt text-center">
            <p>Already have an account?</p>
            <Button
              btnLink="/auth/login"
              btnText="Login"
              variant="cs-auth_link"
            />
          </Div>
        </Div>
        <ToastContainer />
      </Layout>
    </>
  );
}
