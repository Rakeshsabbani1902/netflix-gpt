import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="md:pt-[18%] pt-[35%] px-20 md:mt-[0%] mt-[12%]  w-screen aspect-video absolute bg-gradient-to-r from-black text-white">
       <h1 className=" md:text-4xl text-2xl font-bold">{title}</h1>
       <p className="md:w-1/2 w-auto p-2 text-sm md:text-lg">{overview}</p>
       <div className=" flex my-3 md:m-0">
        <button className="md:p-4 p-2 md:px-12 px-4 text-sm md:text-xl mx-3 bg-white font-bold rounded-md  text-black hover:bg-opacity-80"> <img  className ="w-10" alt="play=logo" src="https://miro.medium.com/v2/da:true/resize:fit:768/1*IDJ4x4E-bOypnEZdA5TGHQ.gif" />Play</button>
        <button className="md:p-4 p-2 md:px-12 px-4 text-sm md:text-xl bg-gray-400 font-bold rounded-md bg-opacity-50">More Info </button>
       </div>
    </div>
  )
}

export default VideoTitle
