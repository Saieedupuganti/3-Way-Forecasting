import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import { auth } from './Firebase';
import {onAuthStateChanged} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import Dash1 from './Dash1'

export const AuthContext = createContext();

const App = () => {
  const location = useLocation();  // Use useLocation to get the current URL

  useEffect(() => {
    setPage(location.pathname);  // Update the page state whenever the URL changes
    setPageName(location.pathname.split('/').slice(-1)[0]); // Update the page state whenever the URL changes
  }, [location]);

  const [page,setPage] = useState('/home');
  const [pagename,setPageName] = useState('highchart');
  const [val1,setVal1] = useState('1');
  const [token, setToken] = useState('');
  window.fetch2 = async (url,methods) => {
    // console.log(methods);
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
    // console.log(page)
    if(page=="/" || page=="/login")
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
    <AuthContext.Provider value={{ page, setPage, val1, pagename,setPageName }} >
      <div className='flex flex-col min-h-screen'>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Home/*" element={<Home />} />
          </Routes>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
