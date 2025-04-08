import React from 'react'
import  assests from '../assets/admin-assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
function SideBar() {
  const navigate = useNavigate(); 
  return (
    <div className='min-h-screen bg-[#003A10]  pl-[4vw]'>
      <img className='mt-5 w-[max(10vw,100px)] hidden sm:block' src={assests.logo} alt="Logo Image " />
      <img className='mt-5 w-[max(5vw , 40px)] mr-5 sm:hidden block' src={assests.logo_small} alt="Logo Spotify" />
      <div  className='flex flex-col gap-5 mt-10 '>
        <NavLink to='/addsong'  className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
          <img className='w-5' src={assests.add_song} alt="Add song image" />
          <p className='hidden sm:block'>
            Add Song
          </p>
        </NavLink>
        <NavLink to='/listsong' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
          <img className='w-5' src={assests.song_icon} alt="Song icon" />
          <p className='hidden sm:block'>
            List Song
          </p>
        </NavLink>
        <NavLink to='addalbum' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer '>
          <img className='w-5' src={assests.add_album} alt="Add Album image" />
          <p className='hidden sm:block'>
            Add Album
          </p>
        </NavLink>
        <NavLink to='/listalbum' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw,10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium cursor-pointer'>
          <img className='w-5' src={assests.album_icon} alt="Album icon" />
          <p className='hidden sm:block'>
           List Album
          </p>
        </NavLink>

      </div>
    </div>
  )
}

export default SideBar