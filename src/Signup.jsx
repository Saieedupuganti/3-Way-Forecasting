import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase'; // Adjust path as per your file structure
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility


  const googleProvider = new GoogleAuthProvider();
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Basic email validation
    const isValidEmail = () => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // Check if passwords match
    const passwordsMatch = password === confirmPassword;

    // Check if password length is at least 6 characters
    const isPasswordLengthValid = password.length >= 6;

    // Perform validations
    if (!isValidEmail()) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    if (!isPasswordLengthValid) {
      setError('Password should be at least 6 characters.');
      return;
    }

    // If all validations pass, proceed with sign-up
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // User signed up successfully
      const user = userCredential.user;
      alert('Sign-up successful!');
      // You can optionally redirect or do something else after successful signup
    } catch (error) {
      console.error('Error signing up:', error.message);
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please sign in instead.');
      } else {
        setError(`Error signing up: ${error.message}`);
      }
    }
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-full flex-grow bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100 mt-4 mb-6">Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setError('')}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setError('')}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setError('')}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="showPasswordCheckbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPasswordCheckbox" className="text-zinc-800 dark:text-zinc-100">Show Password</label>
          </div>
          <div className="mb-4 flex gap-6">
            <button type="submit" className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-blue-700">Sign Up</button>
            <button className="w-full block bg-blue-600 text-white rounded-lg" onClick={handleGoogleLogin}>
              Google
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-center text-zinc-600 dark:text-zinc-400">Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
