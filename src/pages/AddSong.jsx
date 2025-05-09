import React, { useEffect, useState } from "react";
import assets from "../assets/admin-assets/assets";
import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";

function AddSong() {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [songName, setSongName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [loading, setLoading] = useState(false);
  const [albumData, setAlbumData] = useState([]);
  
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', songName);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('audio', song);
      formData.append('album', album);
      
      const response = await axios.post(`${baseUrl}/api/songs/add`, formData);
      // console.log('The response is:',response.data);
      if (response.data.success) {
        toast.success("Song added successfully");
        setSongName('');
        setDesc('');
        setAlbum('none');
        setImage(false);
        setSong(false);
      } else {
        toast.error("Error adding song");
      }
    } catch (error) {
      toast.error("Error Occured while adding song");
    }
    setLoading(false);

  
  }
  const loadAlbumData = async ()=>{
    try {
      const response = await axios.get(`${baseUrl}/api/albums/lists`);

      if(response.data.success){
        setAlbumData(response.data.albums);
      } else {
        toast.error('Unable to load albums data')
      }
    } catch (error) {
      toast.error('Error occured')
    }
  }

  useEffect(()=>{
    loadAlbumData();
  },[])
  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin">

      </div>
    </div>
  ) :(  
    <form onSubmit={onSubmitHandler} className="flex flex-col items-start gap-8 text-gray-600 ">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input onChange={(e)=>setSong(e.target.files[0])} type="file" id="song" accept="audio/*" hidden />
          <label htmlFor="song">
            <img
              className="w-24 cursor-pointer"
              src={song ? assets.upload_added : assets.upload_song}
              alt="Upload Song Icon"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id="image" accept="image/*" hidden />
          <label htmlFor="image">
            <img
              className="w-24 cursor-pointer"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload Image Icon"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song name</p>
        <input
          type="text"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          value={songName}
          onChange={(e)=>setSongName(e.target.value)}
          placeholder="Type Song name here"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song discription</p>
        <input
          type="textarea"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
          placeholder="Type Song Discription here"
          required
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <div className="relative">
  <select 
    className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[150px] appearance-none"
    defaultValue={album}
    onChange={(e) => setAlbum(e.target.value)}
  >
    <option value="none">Select an album</option>
    {albumData.map((item, index) => (
      <option key={index} value={item.name}>
        {item.name}
      </option>
    ))}
  </select>
  <div className="absolute right-3 top-3 pointer-events-none">
    ▼
  </div>
</div>
      </div>
      <button
        type="submit"
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer hover:bg-green-800 transition duration-300"
      >
        Add Song
      </button>
    </form>
  );
}

export default AddSong;
