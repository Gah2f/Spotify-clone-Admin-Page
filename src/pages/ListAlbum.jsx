import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../App';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';

function ListAlbum() {
  const [data, setData] = useState([]);

  const fetchAlbum = async ()=>{
    try {
      const response = await axios.get(`${baseUrl}/api/albums/lists`);
      if(response.data.success) {
        setData(response.data.albums)
      }
    } catch (error) {
      toast.error("Error occured while listing")
    }
  }

  const removeAlbum = async (id)=>{
    try {
      const response = await axios.post(`${baseUrl}/api/albums/remove`, {id})
      if(response.data.success) {
        toast.success(response.data.message)
        await fetchAlbum();
      }
    } catch (error) {
      toast.error("Error Occured")
    }
  
  }

  useEffect(()=>{
     fetchAlbum();
  },[])
  return (
    <div>
        <p>All Albums list</p>
        <br />
        <div>
          <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3  border border-gray-300 text-sm mr-5 bg-gray-100'>
            <b>Image</b>
            <b>Name</b>
            <b>Discription</b>
            <b>Album</b>
            <b>Action</b>
          </div> 
          {
            data.map((singleAlbum,index)=>{
              return(
                <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                  <img className='w-12 cursor-pointer' src={singleAlbum.image} alt="Album Image" />
                  <p>{singleAlbum.name}</p>
                  <p>{singleAlbum.desc}</p>
                  <input type="color" value={singleAlbum.bgColor} />
                  <p onClick={()=>removeAlbum(singleAlbum._id)} className='cursor-pointer hover:text-red-500'><DeleteIcon/></p>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default ListAlbum