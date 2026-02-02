//Header ke ander hum saare ke saare links rakhenge,
// lakin logout dikhana h, ya nahi dikhana h wo hum conditional rendering se handle krenge.
// Agar user logged in hai, to logout waala button show krenge, nahi to nahi show krenge

import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Header() {
    // authSlice ke ander mujhe state: false daalna hai jo ki authSlice.js file me h
    // as intial state = status = false , bas wohi acces kr rahe h yaaha pe
    const authSlice = useSelector((state) => state.auth.status)

    // ab navigate ka use krenge
    const navigate = useNavigate()

    // Ab iss tarah ki jab navigation banti h na,
    // to always prefer kiya jaata hai ki,array banaya jaayega and then usske uppar loop rahega.

    // ye raha mera array
    const naItems = [
        // and isske ander objects
        {
            name: 'Home',
            // slug - ka mtlb hai ki actually me url kaha pe jaa raha h
            slug: "/",
            // and ek de denge active 
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            // yaha login depend krega authStatus pe
            // basically hum const authStatus jo uppar banaye h, usse puchenge.
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            // yaha Signup depend krega authStatus pe
            // basically hum const authStatus jo uppar banaye h, usse puchenge.
            // isse ye hoga, active hai to show krenge functionlity nahi to nahi.
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <header className='py-3 shadow bg-gray-500'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto'>

            {/* // Uppar jo array hai, usspe hum ek map laagayenge */}
            {/* Jab map laaye to mujhe ek callback milta h, () => {}, yaha hum {} use nahi krenge, kyuki use kiya to return krna hoga kuch jo ki yaha need nahi h */}
            {/* So, map ka callback () => ()   -- ye use krenge return nhi krna hoga kuch */}
            {/* // map ((item)) - map ke ander har item milega  */}
            {navItems.map((item) => 
            // yaha mai puch raha hu map se item active h ya nahi ? 
            // item.active ? () : null  - active hai to () ye karo , nahi to null ()mtlb kuch display hi nhi krna chahta mai
            item.active ? (
            // agar active hai to mai ek <li> show krna chahta hu
            // ab key dena hoga, key kya hai , har item ka unique name hi key hai.
              <li key={item.name}>

                {/* // ab ek button chahiye and issi button ke ander saara ka saara navigation waala part hoga  */}
                <button
                // jab button pe click hoga to navigate kr do item ke slug pe - mtlb item ke url pe jaha map h
                onClick={() => navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}</button>
              </li>
            ) : null
            // agar item active nahi h to null - mtlb kuch bhi show mt kro UI pe 
            )}

        {/* // now, ab authStatus check krenge yaha pe  */}
        {/* // Mostly used Syntax - {authStatus && ()}  */}
        {/* //basically, authStatus - agar true hoga then () ye show hoga nahi to nahi show hoga. */}
            {authStatus && (
                // agar authStatus - true h to logout button show kro
              <li>
                {/* // logout component button show kr diye  */}
                <LogoutBtn />
              </li>
            )}
          </ul>
        {/* // yaah navigation bar end hoga hai, and ye nav Container ke ander hi h  */}
        </nav>
        {/* // Yaha Container end hota h  */}
        </Container>
    </header>
    )
}

