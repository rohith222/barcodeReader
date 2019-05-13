import React from 'react';
import Header from './components/header/Header';
import Scanner from './components/scanner/Scanner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <br />
      <Scanner />
    </div >
  );
}

export default App;