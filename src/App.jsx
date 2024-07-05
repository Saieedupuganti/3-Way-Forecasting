import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import { auth } from './Firebase';
import {onAuthStateChanged} from 'firebase/auth'
// import './styles.css';

const App = () => {
  const [token, setToken] = useState('');
  window.fetch2 = async (url,methods) => {
    console.log(methods);
    if(typeof(methods.headers)==typeof({})){
        methods.headers = {
            'Content-Type': 'application/json',
           ...methods.headers
        }
    }else{
        methods.headers = {
            'Content-Type': 'application/json',
        }
    }
    const res = await fetch(url, methods);
    const data = await res.json();
    return data;
}


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
        console.log('User signed in:', user);
      } else {
        console.log('No user signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  //.then((data) => {console.log('Auth state changed')});
  return (
    <div className='flex flex-col min-h-screen'>
      <h1 className='w-full text-center py-4 text-4xl'>C Suite Navigator</h1>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Widget />} /> */}
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
