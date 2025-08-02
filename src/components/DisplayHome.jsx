import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItems from './AlbumItems'
import { songsData } from '../assets/assets'
import SongsItems from './SongsItems'


const DisplayHome = () => {
  return (
<>
  <Navbar />
  <div className='mb-4'>
    <h1 className='my-5 font-bold text-2xl'>Featured Charts</h1>
    <div className='flex overflow-auto'> 
       { albumsData.map((item,index) => (<AlbumItems key={index}  name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
 </div>
    </div>
      <div className='mb-4'>
    <h1 className='my-5 font-bold text-2xl'>Today's Top Hits</h1>
    <div className='flex overflow-auto'> 
      {songsData.map((item,index) => (<SongsItems key={index}  name={item.name} desc={item.desc} id={item.id} image={item.image} />))}
 </div>
    </div>
  </>
  )
}

export default DisplayHome