import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, onAuthStateChanged  } from 'firebase/auth';
import { auth } from './Firebase'; // Assuming you have Firebase auth and config setup correctly
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Use null instead of an empty string for error state
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const googleProvider = new GoogleAuthProvider();

  // Basic email validation
  const isValidEmail = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform email validation
    if (!isValidEmail()) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in:', error.code, error.message);
      let errorMessage = 'Failed to login. Please check your credentials.';

      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'The Email (or) password you entered is incorrect.';
      } else {
        errorMessage = 'Failed to login. Please try again later.';
      }

      setError(errorMessage);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Please check your email.');
    } catch (error) {
      console.error('Error sending password reset email:', error.code, error.message);
      if (error.code === 'auth/user-not-found') {
        alert('No user found with this email address. Please check your email and try again.');
      } else {
        alert('Failed to send password reset email. Please try again later.');
      }
    }
  };

  const handleEmailChange = () => {
    // Clear error message when user starts typing in email field
    setError(null);
  };

  const handlePasswordChange = () => {
    // Clear error message when user starts typing in password field
    setError(null);
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

  const navigate = useNavigate();
  function Verified(){
    navigate('/home');
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // setToken(user.accessToken);
        console.log('User signed in:', user);
        Verified();
      } else {
        console.log('No user signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);


  return (
    <div className="flex justify-center h-screen flex-col bg-zinc-100 dark:bg-zinc-900">
      <h1 className='w-full text-center py-2 text-4xl bg-gray-800 text-white'>
        <img src="logo3.jpg" alt="C Suite Navigator Image" className="w-20 mx-auto py-0 inline-block" />
        {/* C Suite Navigator */}
      </h1>
    <div className="flex justify-center flex-grow bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-8 flex-grow justify-center rounded-lg shadow-lg w-full max-w-md mt-20 h-fit mx-5">
        <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100 mt-4 mb-6">Sign in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); handleEmailChange(); }}
              required
              className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); handlePasswordChange(); }}
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
            <button type="submit" className="w-full bg-blue-800 text-white py-1 rounded-lg hover:bg-blue-700">
              Sign in
            </button>
            <button className="w-full block bg-blue-600 text-white rounded-lg" onClick={handleGoogleLogin}>
              Google
            </button>
          </div>
        </form>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          Don't have an account? <Link to="/" className="text-primary hover:underline">Sign up</Link>
        </p>
        <p className="text-center text-zinc-600 dark:text-zinc-400">
          <Link to="/forgot-password" className="text-primary hover:underline" onClick={handleForgotPassword}>
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
    </div>
  )
};

export default Login;
