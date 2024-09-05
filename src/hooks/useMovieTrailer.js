/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer =(movieId)=>{
   

    const dispatch = useDispatch();
    const trailerVideo = useSelector(store=>store.movies.trailerVideo);
    //Fetch trailer video && updating the store with trailer video data
    
    const getMovieVideos= async ()=>{
     
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId +"/videos",API_OPTIONS);
        const json = await data.json();
        
        const trailer = json.results.filter(video => video.name==="Official Trailer");
       
        if (trailer){ dispatch(addTrailerVideo(trailer))};
        
    };

    useEffect(()=>{

        !trailerVideo &&getMovieVideos();
    
    },[]);
}

export default useMovieTrailer;