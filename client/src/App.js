import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login/Login';
import Register from './components/auth/Register/Register';
import Error from './components/error/Error'
import Header from './components/header/Header';
import Upload from './components/test/Upload';
import Banner from './components/books/banner/Banner';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/upload' element={<Upload />} />
        <Route path='/banner' element={<Banner />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
