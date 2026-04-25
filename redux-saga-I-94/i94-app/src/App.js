import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import I94Home from './components/I94Home';
import I94Form from './components/I94Form';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<I94Home />} />
        <Route path="/new-i94" element={<I94Form />} />
      </Routes>
    </Router>
  );
};

export default App;
