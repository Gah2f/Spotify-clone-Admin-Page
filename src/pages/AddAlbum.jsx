import React from "react";
import assets from "../assets/admin-assets/assets";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../App";
import { toast } from "react-toastify";

function AddAlbum() {
  const [image, setImage] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bgColor", color);
      formData.append("desc", desc);
      formData.append("image", image);

 
      const response = await axios.post(`${baseUrl}/api/albums/add`, formData);

      if (response.data.success) {
        toast.success("Album added successfully");
        setColor("#ffffff");
        setName("");
        setDesc("");
        setImage(false)
      } else {
        toast.error("Error occured ");
      }
    } catch (error) {
      toast.error("Error on adding album");
    }
    setLoading(false);
  };
  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          type="file"
          id="image"
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt="Upload Icon"
          />
        </label>
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type the album name here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Discrtipiton</p>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Type the album discription here"
          className="bg-transparent outline-green-600 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Color</p>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <button
        className="text-base bg-black text-white py-2.5 px-14 cursor-pointer hover:bg-green-700 "
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}

export default AddAlbum;
