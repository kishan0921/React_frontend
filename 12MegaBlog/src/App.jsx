import "./App.css";

// STEP: 02.1
// note: jab mujhe redux ko react ke saath use krna hai to useDispatch , lena bahut zaruri h
import { useDispatch } from "react-redux";
//state manage krne ke liye useState.& useEffect ka use krke jab page load hoga to hum
// puch lenge user logged in hai ya ni. so ye sab import kr lete h react se.
import React, { useState, useEffect } from "react";

// login and logout waala slice  import kr lete hai slice se called authSlice
import { login, logout } from "./store/authSlice";

// STEP : 03.1
// auth service jo apna appwrite wala  bana h, ussko import kar lete h
import authService from "./appwrite/auth";
// Footer waala components import kr lete h
import { Footer } from "./components";

function App() {
  // STEP 00: Issko ab zarurat ni hai.
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  // STEP : 01
  // Now, sabse pehle ek state banayenge loading,
  //Appwrite se data lenge, tab on the spot to result aayega nahi,
  // to ek loading state bana lena sahi rahta hai,
  // Loading state se hum conditionally rendering kr skte h
  //Loading agar true hai, to loading dikhange,
  // loading agar false hai, to Data show krenge
  // Usually, starting me loading hum true krenge,
  //means, loading dikhega, and behind the seen, jab tk loadin dikhega
  // taab tk useEffect call hoga and then useEffect me loadin mai false kr dunga.
  const [loading, setLoading] = useState(true);

  // STEP : 02
  // and ab dispatch to lena hoga,kyuki current user le kar aao and ye sab to krna hoga
  // and ittna likhne se nahi aayega, issko import bhi krna hoga , react-redux se
  const dispatch = useDispatch();

  // STEP : 03 - Ab chahiye ek service (to auth serivce ek humne banai thi)
  // Ab target hai ki, jaise hi application load ho
  // to ek useEffect lo and pucho uss service se "auth.js" service se
  //ki aap/ user logged in hai ya nahi
  // useEffect (()=> {})
  // useEffect (()=> {}, [])
  useEffect(() => {
    // Ab jaise hi yaha pe aao to auth serive se pucho,
    // ki aapka current user kon hai
    // Humne auth.js me ek method banaya tha getCurrentUser ()
    // agar ye mil gya then
    authService
      .getCurrentUser()
      // Successfully mil gaya then
      // then () => {} ke ander ye callback milta hai
      // userData le liye - variable bolo issko
      .then((userData) => {
        // Ab hum dispatch karenge, kyuki authService.js me jaaoge to
        // state.userData = action.payload.userData;  ye dispatch krna hoga.
        // only agar userData hai tabhi nahi to ni, means userData agar nhi h , mtlb user hai hi nhi
        if (userData) {
          // agar userData h, mtlb user hai....then dispatch kr do information
          dispatch(login({ userData }));
        } else {
          // else me mai 1 aur dispatch karunga,
          // agar userData nahi mila then,then ek activity call kr dete hai, logout
          // taaki atleast humare state update ho jaayega, ki login nahi hai hum
          dispatch(logout());
        }
      })
      // Hum catch () use nahi karenge, hum finally use krenge, kyuki finally run hota hi hota h
      // ab uppar waala saara kaam ho gaya then
      // uppar agar dekhoge then logging ka state = true hai , issko false kr denge
      .finally(() => setLoading(false));
  }, []);

  return (
    //   <>
    // <h1>A blog app with appwrite</h1>
    //   </>
    // Ab hum conditionally rendering ka use krenge,
    // like !loading ?  () : (null)- mtlb agar loading false hai to () issme logic /
    // else : (null) value assigned kr raha hu.
    <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>// TODO {/* Outlet  */}</main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
