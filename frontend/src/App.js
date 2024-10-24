// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserAuth from './components/LoginRegister';
import FlightList from './components/FlightList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserAuth />} />
        <Route path="/flights" element={<FlightList />} />
      </Routes>
    </Router>
  );
};

export default App;
