import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const [isSignInForm , setIsSignInForm]= useState(true);
    const [errorMessage,setErrorMessage] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);


const handleButtonClick=()=>{
//Validate the form data

  
   
   const message = checkValidData(email.current.value,password.current.value);
   setErrorMessage(message);
   if(message) return ;

   //Sign If Sign Up Logic

   if(!isSignInForm){
    //Sign Up Logic
  createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    updateProfile(user, {
      displayName: name.current.value,
      photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMMCBgSyTBDneWKr72GPHAcI3iMWZgq16wbA&s" 
    })
    .then(() => {
      // Profile updated!
      const {uid,email,displayName,photoURL} = auth.currentUser ;
          dispatch(addUser({uid : uid, email :email ,displayName : displayName,photoURL: photoURL}));
         
      navigate("/browse");
    })
    .catch((error) => {
      // An error occurred
      
      setErrorMessage(error.message);
    });
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "" + errorMessage);
   
    // ..
  });

   }
   else{
     //Sign In Logic
  signInWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse");
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "" +errorMessage )
  });

   }


}


const toggleSignInForm =()=>{
  setIsSignInForm(!isSignInForm);
}
  return (
    <div>
        <Header/>
       <div className="absolute">
         <img src="https://assets.nflxext.com/ffe/siteui/vlv3/20bf1f4d-1c73-48fd-8689-310d6dd80efc/81bdc063-cb8f-4afe-8a02-a3131ca4ef5e/IN-en-20240812-POP_SIGNUP_TWO_WEEKS-perspective_WEB_7998f3b6-63e3-424a-8328-550cf777ddce_large.jpg" alt ="bg-image"/>
       </div>
       <form onSubmit = {(e)=> e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
         <h1 className="font-bold text-3xl py-4">{ isSignInForm ? "Sign In " : "Sign Up"}</h1>
      {!isSignInForm &&  <input ref={name} type="text" placeholder='Full Name ' className="p-2 my-3 w-full bg-gray-700 "/>}
        <input ref={email} type="text" placeholder='Email Address' className="p-2 my-3 w-full bg-gray-700 "/>
        <input ref = {password} type="password" placeholder='Password' className="p-2 my-3 w-full bg-gray-700 "/>
        {!isSignInForm &&  <input type="number" placeholder='Mobile Number' className="p-2 my-3 w-full bg-gray-700 "/>}
        <p className="font-bold py-3 text-lg text-red-500">{errorMessage}</p>
        <button className="p-3 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{ isSignInForm ? "Sign In " : "Sign Up"}</button>
        <p className="py-3 cursor-pointer" onClick={toggleSignInForm}>{ isSignInForm ? "New to Netflix ? Sign Up now" : "Already registered ? Sign In now  "} </p>
       </form>
    </div>
  )
}

export default Login