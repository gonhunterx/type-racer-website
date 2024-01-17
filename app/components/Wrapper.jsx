import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='h-screen w-screen bg-slate-300 text-center text-black justify-center'>{children}</div>
  )
}

export default Wrapper