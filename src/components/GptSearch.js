import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_URL } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10">
         <img  className="w-full h-full object-cover" src={BG_URL} alt ="bg-image"/>
       </div>
       <div >
      <GptSearchBar/>
      <GptMovieSuggestions/>
      </div>
    </>
  )
}

export default GptSearch