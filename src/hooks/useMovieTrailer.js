import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer =(movieId)=>{
   

    const dispatch = useDispatch();
 
    //Fetch trailer video && updating the store with trailer video data
    
    const getMovieVideos= async ()=>{
     
        const data = await fetch("https://api.themoviedb.org/3/movie/" + movieId +"/videos",API_OPTIONS);
        const json = await data.json();
        
        const trailer = json.results.filter(video => video.name==="Official Trailer");
       
        if (trailer){ dispatch(addTrailerVideo(trailer))};
        
    };

    useEffect(()=>{
        getMovieVideos();
    },[])
}

export default useMovieTrailer;