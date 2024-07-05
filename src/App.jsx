import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import { auth } from './Firebase';
import {onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Dash1 from './Dash1';


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

  const navigate = useNavigate();
  function Verified(){
    navigate('/home');
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setToken(user.accessToken);
        console.log('User signed in:', user);
        Verified();
      } else {
        console.log('No user signed in');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  //.then((data) => {console.log('Auth state changed')});
  return (
    <div className='w-1/2 mx-auto mt-20'>
        {/* <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Routes> */}
        <Dash1 />

    </div>
  );
};

export default App;
