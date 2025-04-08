import React from 'react'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'
import { Routes, Route } from 'react-router-dom';
import AddSong from './pages/AddSong';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import ListAlbum from './pages/ListAlbum';
import SideBar from './components/SideBar';
import Nav from './components/Nav';

export const baseUrl = 'http://localhost:4000'
function App() {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer/>
      <SideBar/>
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Nav/>
        <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path='/addsong' element={<AddSong/>}/>
            <Route path='/addalbum' element={<AddAlbum/>}/>
            <Route path='/listsong' element={<ListSong/>}/>
            <Route path='/listalbum' element={<ListAlbum/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App