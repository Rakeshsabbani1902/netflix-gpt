import React from 'react'
import {  useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';


const VideoBackGround = ({movieId}) => {
    const trailerVideo = useSelector(store=>store.movies?.trailerVideo) ;
  
  

  useMovieTrailer(movieId);

  if(!trailerVideo) return null;
  return ( 
      
    <div className="w-screen ">
         <iframe className ="w-screen aspect-video" src={`https://www.youtube.com/embed/${trailerVideo[0]?.key}?si=nIzKgMszLBYmBGyH&autoplay=1&mute=1`}  title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
    </div>
  )
}

export default VideoBackGround 