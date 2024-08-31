import { useEffect } from 'react'
import {  API_OPTIONS } from "../utils/constants"
import { useDispatch } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'


const usePopularMovies =()=>{
    //Fetch data form TMDG API and update the store 
    const dispatch = useDispatch();

  const getusePopularMovies = async ()=>{
     
    const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS );
    const json = await data.json();
  
    dispatch(addPopularMovies(json.results));

  }

  useEffect(()=>{
    getusePopularMovies();
  },[]);

   
}

export default usePopularMovies;