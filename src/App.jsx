import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './Signup';
import Login from './Login';
// import './styles.css';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Widget />} /> */}
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
