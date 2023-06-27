import React, { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';

import { Header, Layout } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { Footer } from './pages/Footer';
import { Switch } from '@mui/material';
import { HomePage } from './pages/HomePage';
import { Blogpage } from './pages/Blogpage';


function App() {

  const [isLoggedIn, setLoggedIn] = useState(false);

  return (


    <div className='App'>

      <Header isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />

      <main className='conteiner'>

        <Routes>

          <Route exact path="/" Component={() => <HomePage />} />

          <Route exact path="/posts" Component={() => <Blogpage />} />

          <Route exact path="/loginPage" Component={(props) => <LoginPage {...props} setLoggedIn={setLoggedIn} />} />

        </Routes>

      </main>

      <Footer year={new Date().getFullYear()} />

    </div >

  );
}

export default App;
