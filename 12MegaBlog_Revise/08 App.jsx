import "./App.css";

// STEP: 02.1
// note: jab mujhe redux ko react ke saath use krna hai to useDispatch , lena bahut zaruri h
import { useDispatch } from "react-redux";
//state manage krne ke liye useState.& useEffect ka use krke jab page load hoga to hum
// puch lenge user logged in hai ya ni. so ye sab import kr lete h react se.
import React, { useState, useEffect } from "react";

// STEP : 07.1
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

  // useEffect - STEPS:
  // useEffect lo then, parenthesis lagao () Like - useEffect()
  // then ek callback lo ()=>{}, like - useEffect (()=> {})
  // then, haan ek dependency array to bhul hi gya, like - useEffect (()=> {}, [])
  useEffect(() => {
    // STEP : 04
    // Ab jaise hi yaha pe aao to auth serive se pucho,
    // ki aapka current user kon hai
    // Humne auth.js me ek method banaya tha getCurrentUser ()
    // getCurrentUser () - ye method hume current user de dega.
    authService
      .getCurrentUser()

      // STEP 05: then (true case)
      // agar Successfully mil gaya then(mtlb true case)
      //aur Successfully dta fetch ho gya hai,
      // then isske ander ek callback milta hai,like- () => {}
      // callback ke ander userData milta hai, userData ek variable hai.
      .then((userData) => {
        // STEP 06:
        //Ab iss userdata ko le kar kaha jaana hai, basically ab issko hume dispatch krna hoga.
        // taaki authService ke action.payload.userData ko data mil jaaye.
        // Ab dispatch jo krenge,to chota sa if-else le lete hai.
        // agar data hua to dispatch krenge, warna kru krna dispatch.

        // Ab hum dispatch karenge, kyuki authService.js me jaaoge to
        // state.userData = action.payload.userData;  ye dispatch krna hoga.
        // only agar userData hai tabhi nahi to ni, means userData agar nhi h , mtlb user hai hi nhi

        // STEP : 07
        if (userData) {
          // agar userData h, mtlb user hai....
          // Kya dispatch krna hai ? - dispatch krna hai chota sa method - login()
          //ab login ke ander kya pass krna hai?, object hum pass krenge,jissske ander hoga "userData"
          dispatch(login({ userData }));
        } else {
          // STEP : 08
          // else me mai 1 aur dispatch karunga, jo ki hai logout() method
          // ab logout kyu? - maine user se data lene ki kosis ki na "getCurrentUser", agar  nahi hai, then ek activity call kr dete hai logout()
          // isse atleast, mera state update ho jaayega, ki aap logged in nahi ho.
          // to hmehsa mera state update hi rahega. (ya to loggedin ya logout se update rahega mera state)
          dispatch(logout());
        }
      })

      // STEP : 09
      // Note: finally Run hota hi hota hai.
      // Hum catch () use nahi karenge, hum finally use krenge, kyuki finally run hota hi hota h

      // STEP: 09.1
      // ab uppar waala saara kaam ho gaya
      // then,finally method to hume mil hi raha hai.
      // and isske ander hum ek callback le lenge.
      // uppar agar dekhoge then logging ka state = true hai ,
      // issko false kr denge (mtlb login ka kaam mera ho chuka hai)
      .finally(() => setLoading(false));
  }, []);

  // STEP : 10
  // ab return jo mera statement hai, wo hum apne hisaab se krenge.
  // Method 01:
  //return(
  // Old code: commented
  //   <>
  // <h1>A blog app with appwrite</h1>
  //   </> )

  // STEP : 11
  // Break : Install Tailwind then continue....

  // STEP : 12
  // Method : 02 - conditionally rendering
  // Aise bhi use hota hai:
  // return !loading ? () : null

  // Ab hum conditionally rendering ka use krenge,
  // return !loading ? (): (null)

  //loading agar true hai- then null
  // loadin agar false hai - then ()

  return !loading ? (
    <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
      {/* ek aur div lenge hum  */}
      <div className="w-full block">
        {/* ab yaha pe 2 component call krne hai hume- header & footer*/}
        <Header />
        {/* ab important chize, jab bhi aapko hader ya footer jaisi chiz display krwani hai */}
        {/* to hum main lete hai, and isske ander hum outlet display krwa dete hai */}
        <main>
          {/* ye jo outlet hai ye mera reeact router-dom se aayega 
          abhi isko comment krte hai,react-router dom configure humne ni kiya h*/}
          {/* TODO:  */}
          {/* <Outlet /> */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
