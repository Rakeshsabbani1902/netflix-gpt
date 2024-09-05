import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from "../utils/languageConstants"
import openai from "../utils/openai";
import { API_OPTIONS } from '../utils/constants';
import {addGptMovieResult} from "../utils/gptSlice";

const GptSearchBar = () => {
 
  
 const dispatch = useDispatch();
const langKey = useSelector(store=>store.config.lang);
const searchText = useRef(null);

//search movie in TMDB
const searchMovieTMDB = async(movie)=>{

  const data  = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);

  const json = await data.json();

  return json.results ;

}

const handleGptSearchClick= async()=>{
   console.log(searchText.current.value);
   //Make an API Call to GPT API and get Movie Results

   const gptQuery = "Act as a Movie recommondation system and suggest some movies for the query" +searchText.current.value + ".Only give me names of 6 movies,comma seperated like the example result given ahead .Example Result : Baahubali , RRR ,";

   const gptResults =  await openai.chat.completions.create({
    messages: [{ role: 'user', content:gptQuery  }],
    model: 'gpt-3.5-turbo',
  });
  

  if(!gptResults.choices){
    //TODO : Write Error Handling

  }
  console.log(gptResults.choices?.[0].message?.content)

  const gptMovies = gptResults.choices?.[0].message?.content.split(",");

  //For each movie I will search TMDB API 

  const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie))
  //[Promise,Promise,Promise,Promise,Promise]
 
  const tmdbResults = await Promise.all(promiseArray)
  console.log(tmdbResults);

  dispatch(addGptMovieResult({movieNames : gptMovies , movieResults : tmdbResults}));
}

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form className="w-full md:w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=> e.preventDefault()}>
            <input ref={searchText} type="text" className=" col-span-9 p-4 m-4" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar