// rafce

import React from "react";

// STEP : 01
// Sabse 1st component hai container, and most common bhi hai
// Container hota ky hai?
// container aapki properties accept krta as children.
// Container sirf ek box hota hai,jisske uppar and niche kuch hai.
// same as mera app.jsx (issme uppar header hota hai, and niche footer)
// Most Imp: container ke ander hum bas styling properties define krte hai.(height, width etc)
//aap aage jaakr nextjs, typescript ke banao ye common concept hai use hoga hi.
function Container({ children }) {
  // STEP : 02

  // Method :01 - ais bhi likh skte hai issko (syntax 01)
  return (
    // isske ander, hum 1st kuch classses addd kr dete hai
    // then yaha hum apna children introduced kr diye h
    // and div ke ander hum, apna children introduced kr diye hai
    <div className="w-full max-w-7xl mx-auto px-4">{children}</div>
  );

  // Method 02: - aise bhi likh skte hai issko (syntax 02)
  //Bonus: you can write this also , it will work becoz its a single line.
  // return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;
}

export default Container;
