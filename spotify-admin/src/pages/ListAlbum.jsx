import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { url } from '../App';

const ListAlbum = () => {
  const [data,setData]=useState([])

  const fetchAlbums=async()=>{
    try {
      const response=await axios.get(`${url}/api/album/list`)

      if (response.data.success) {
        setData(response.data.albums)
        
      }
    } catch (error) {
      toast.error("Error Occur")
    }
  }
  const removealbum=async(id)=>{
       try {
        const responce=await axios.post(`${url}/api/album/remove`,{id})
        if (responce.data.success) {
          toast.success(responce.data.message);
          await fetchAlbums();
        }
       } catch (error) {
        toast.error("Error Occur")
       }
  }
  useEffect(()=>{
    fetchAlbums();
  },[])
  return (
    <div>
      <p>All Album List</p>
      <br />
      <div>
        <div className='md:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>

        </div>
        {data.map((item,index)=>{
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
            <img className='w-12' src={item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <input type="color" value={item.bgColour} />
            <p onClick={()=>removealbum(item._id)} className='cursor-pointer'>x</p>
            </div>
          )
        })}
        
      </div>
    </div>
  );
}

export default ListAlbum;
