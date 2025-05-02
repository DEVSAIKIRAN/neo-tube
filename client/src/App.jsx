import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Result from './pages/Result';
import BuyCredit from './pages/BuyCredit';
import Navbar from './components/Navbar';
import Notfound from './pages/Notfound';
import Footer from './components/Footer';

function App() {
  return (
    <div className='min-h-screen bg-slate-50'>
    <Navbar />
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/result" Component={Result} />
        <Route path="/buy" Component={BuyCredit} />
        <Route path="*" Component={Notfound} />
      </Routes>
      <Footer/>
      </div>
 );
}

export default App;
