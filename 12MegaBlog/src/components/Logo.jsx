import React from 'react'


// function logo ke ander hum ke optional property le rahe hai
// optional issliye kyuki hum property ke saath value bhi yahi pe de rahe h
// width = '100px'
function Logo({width = '100px'}) {
  return (
    <div>Logo</div>
  )
}

export default Logo