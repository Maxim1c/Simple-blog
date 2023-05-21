import { Route, Routes } from 'react-router-dom';
import './App.css';

import { Homepage } from './pages/Homepage';
import { Blogpage } from './pages/Blogpage';
import { Singlpage } from './pages/Singlpage';
import { Notfoundpage } from './pages/Notfoundpage';
import { Aboutepage } from './pages/Aboutepage';
import { Layout } from './components/Layout';


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='posts' element={<Blogpage />} />
          <Route path='posts/:id' element={<Singlpage />} />
          <Route path='about' element={<Aboutepage />} />
          <Route path='*' element={<Notfoundpage />} />
        </Route>
      </Routes>      

    </>

  );
}

export default App;
