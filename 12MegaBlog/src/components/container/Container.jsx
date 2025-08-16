// rafce

import React from 'react'


// Container hota ky hai, 
// container accept krta properties as children.


function Container ({children}){
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>
  )
}

export default Container