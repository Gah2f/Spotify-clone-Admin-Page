import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../App";
import { toast } from "react-toastify";
// import DeleteIcon from '@mui/icons-material/Delete';

function ListSong() {
  const [data, setData] = useState([]);
  const fetchSongs = async () => {
    try {
      const response = await axios.get(`${baseUrl}/api/songs/lists`);
      // console.log("The list response is: ", response.data);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const removeSong = async(id)=>{
    try {
   
    const reponse = await axios.post(`${baseUrl}/api/songs/remove/`,{id});
    // console.log('Response is : ', reponse);

  if (reponse.data.success) {
    toast.success(reponse.data.message);
    await fetchSongs();
  }
      
    } catch (error) {
      toast.error('Error occured')
    }
  }

  useEffect(() => {
    fetchSongs();
  }, []);
  return (
    <div>
      <p>All Songs List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100  ">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>

        {
          data.map((singleSong,index)=>{
            return (
              <div key={index} className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5">
                <img className="w-12" src={singleSong.image} alt="Song Image" />
                <p>{singleSong.name}</p>
                <p>{singleSong.album}</p>
                <p>{singleSong.duration}</p>
                <p onClick={()=>removeSong(singleSong._id)}>x</p>
              </div>
            )
          })
        }
      </div>
    </div>

  )
}

export default ListSong;
