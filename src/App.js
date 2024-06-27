import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardGrid from './components/CardGrid';
import CardModel from './components/CardModel';
import { Web3Provider } from './context/Web3Context';

function App() {
  const [logMessages, setLogMessages] = useState([]);

  useEffect(() => {
    setLogMessages(prev => [...prev, '']);
    // Add similar lines where needed to log other activities
  }, []);

  return (
    <Web3Provider>
      <Router>
        <div>
          {logMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
          <Routes>
            <Route path="/" element={<CardGrid />} />
            <Route path="/model/:id" element={<CardModel />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
