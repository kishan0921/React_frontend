// rafce

import React from 'react'


// Container hota ky hai, 
// container accept krta properties as children.


function Container ({children}){
  return (
    // then yaha hum apna children introduced kr diye h
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )

  //Bonus: you can write this also , it will work becoz its a single line.
  // return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
}

export default Container