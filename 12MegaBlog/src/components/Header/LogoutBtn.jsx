import React from 'react';

//Note: Logout ke baad aapko kuch na kuch action lena hoga,
//kuch dispatch krna hoga, and store se slice lana hoga and reducer also.


// note: jab mujhe redux ko react ke saath use krna hai to useDispatch , lena bahut zaruri h
import {useDispatch} from 'react-redux'

// Logout meri authService ke ander h , so import kr lete h
import authService from '../../appwrite/auth'

// and logout ki individual Service bhi laani hogi tbhi to logout hoga.
import {logout} from '../../appwrite/authSlice'


// ye mera logout Btn aa gya and niche export bhi kr diye h
function LogoutBtn() {
    // Chalo 1 dispatch bana lete hai, kyuki dispatch kuch na kuch krna hi hoga
    const dispatch = useDispatch()

    // ye LogoutBtn ye button hai to , surely logoutHandler banana hoga
    const logoutHandler = () => {
        // isske ander sbse pehle to authService use kro.
    // authService se direct maine ek method banaya hai, logout wo le lenge
    // Now jaise hi logout() call kiya na, ab mujhe milega promise
        authService.logout()
    // ab promise ko handle krne ke liye , .then ka use krenge.
    .then (()=>{
        // agar logout ho gya hai to , to ab dispatch bhi kr dete h
        // taaki store ke ander ko update infromation h wo send ho jaaye
        dispatch(logout())
        })
    }

    return (
        // Ab yaha pe ek button bana h , and iss button pe click hoga to logoutHandler method work krega.
        <button className= 'inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >logout</button>
    )
}

// ye mai apne logoutBtn export kr diya hu.
export default LogoutBtn













