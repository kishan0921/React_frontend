// STEP 01: rafce

import React from "react";

// STEP 03:
//Note: Logout ke baad aapko kuch na kuch action lena hoga,
//kuch action lena hoga, kuch dispatch krna hoga,
//to logout ke liye store se slice lana hoga(means reducer laana hoga)
// note: jab mujhe redux ko react ke saath use krna hai to useDispatch , lena bahut zaruri h
import { useDispatch } from "react-redux";

// STEP 04:
// Logout meri authService ke ander h , authService import kr lete h
import authService from "../../appwrite/auth";
// Step 05:
// and logout ki individual Service bhi laani hogi,tbhi to logout hoga.
// and logout mera store se aayega.
import { logout } from "../../s/authSlice";

// ye mera logout Btn aa gya and niche export bhi kr diye h
function LogoutBtn() {
  // STEP 06:
  // Chalo 1st - ek dispatch bana lete hai, kyuki dispatch kuch na kuch krna hi hoga
  const dispatch = useDispatch();

  // STEP 07:
  // ye LogoutBtn mera ye ek button hai to , surely logoutHandler banana hoga
  const logoutHandler = () => {
    // STEP 08:
    // isske ander sbse pehle to authService use kro.
    // authService se direct maine ek method banaya hai, logout() wo le lenge
    // Note: logout() apne aap me na ek promise hai yaha pe.
    authService
      //STEP : 09
      // Now jaise hi logout() call kiya na, ab mujhe milega promise
      .logout()
      //STEP :10
      // ab promise ko handle krne ke liye , .then() ka use krenge.
      // aapka maan kre to .catch() bhi use kr skte ho.
      .then(() => {
        // agar logout ho gya hai to , to ab dispatch bhi kr dete h
        // taaki store ke ander ko update infromation h wo send ho jaaye (means store updated rahe ki hum login h ya logout hai)
        dispatch(logout());
      });
  };

  return (
    // STEP : 11
    // Ab yaha pe ek button bana h , and iss button pe click hoga to logoutHandler() method work krega.
    <button
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      logout
    </button>
  );

  // STEP 12: To ye to ho gya mera complete button
}

// STEP 02: export default kr dete hai
// ye mai apne logoutBtn export kr diya hu.
export default LogoutBtn;
