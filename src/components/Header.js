import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
   
  const user = useSelector(store=>store.user);
  const showGptSearch = useSelector(store=>store.gpt.showGptSearch)
  

  const handleSignOut=()=>{


    signOut(auth).then(() => {
      // Sign-out successful.
     

    }).catch((error) => {
      // An error happened.
      navigate("/error");

    }); 
  }

  useEffect(()=>{
    const unsubscribe =onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user ;
        dispatch(addUser({uid : uid, email :email ,displayName : displayName,photoURL: photoURL}));
        navigate("/browse");


      } else {
        // User is signed out
        
        dispatch(removeUser());
        navigate("/");
      
      }
    });

    //Unsubscribe when component unmounts 
    return ()=> unsubscribe();


  },[])
  
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView());
  }


  const handleLanguageChange=(e)=>{
       dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className="flex justify-between absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10">
        <img  className="w-40" src={LOGO} alt="Netflix-logo"/>
        { user &&  
        <div className="flex p-2 ">
          { showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=> <option  key ={lang.identifer} value={lang.identifer}>{lang.name}</option>)}
            
          </select>}
          <button className="py-2 px-4  mx-4 my-2 bg-purple-800 text-white rounded-lg" onClick={handleGptSearchClick}>{!showGptSearch ? "GPT Search" :"Home" }</button>
          <img className="w-12 h-12 " alt ="user-icon" src={user?.photoURL} />
          <button className="text-lg font-bold text-white"  onClick={handleSignOut}>Sign out</button>
        </div>}
    </div>
  )
}

export default Header;