import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className="pt-[15%] px-20 w-screen aspect-video absolute text-white bg-gradient-to-r from-black">
       <h1 className="text-3xl font-bold">{title}</h1>
       <p className="text-lg py-6 w-1/4">{overview}</p>
       <div className="flex">
        <button className="bg-white  rounded-lg text-black text-lg p-3 w-32 hover:bg-opacity-60 flex"> <img  className ="w-10" alt="play=logo" src="https://miro.medium.com/v2/da:true/resize:fit:768/1*IDJ4x4E-bOypnEZdA5TGHQ.gif" />Play</button>
        <button className="mx-2 bg-gray-500 rounded-lg text-white bg-opacity-50 text-lg p-3 w-32">More Info </button>
       </div>
    </div>
  )
}

export default VideoTitle