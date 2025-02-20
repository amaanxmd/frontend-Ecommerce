import React from 'react'

const AdidasLogo = ({width=60}) => {
  return (
    <svg height="100%" width={width}  viewBox="100 100 50 32" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M 150.07 131.439 L 131.925 100 L 122.206 105.606 L 137.112 131.439 L 150.07 131.439 Z M 132.781 131.439 L 120.797 110.692 L 111.078 116.298 L 119.823 131.439 L 132.781 131.439 Z M 109.718 121.401 L 115.509 131.439 L 102.551 131.439 L 100 127.007 L 109.718 121.401 Z" fill="black"></path></svg>
  )
}

export const FilterandReset = ()=>{
  return (<svg class="gl-icon"><use xlinkHref="#filter"></use><title>Filter</title></svg>)
}
export const CheckMark=()=>{
  return (<svg height="20" width="20" data-testid="checkmark-svg" xmlns="http://www.w3.org/2000/svg" id="checkmark" viewBox="0 0 19 19"  aria-hidden="true">

    <path fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" d="m2.5 10.5 4 4 10-10"/> 
    
    </svg>)}

    export const GreenCheckMark=()=>{
      return (<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="17px" viewBox="0 0 1024 1024" className="icon" version="1.1"><path d="M866.133333 258.133333L362.666667 761.6l-204.8-204.8L98.133333 618.666667 362.666667 881.066667l563.2-563.2z" fill="#43A047"/></svg>)
    }

    export const RedCross=()=>{
      return (<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="10px" height="10px" viewBox="0 0 36 36" aria-hidden="true" role="img" className="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#DD2E44" d="M21.533 18.002L33.768 5.768a2.5 2.5 0 0 0-3.535-3.535L17.998 14.467L5.764 2.233a2.498 2.498 0 0 0-3.535 0a2.498 2.498 0 0 0 0 3.535l12.234 12.234L2.201 30.265a2.498 2.498 0 0 0 1.768 4.267c.64 0 1.28-.244 1.768-.732l12.262-12.263l12.234 12.234a2.493 2.493 0 0 0 1.768.732a2.5 2.5 0 0 0 1.768-4.267L21.533 18.002z"/></svg>)
    }
  
    export const DefaultUser = ()=>{
      return (<svg width="50px" height="50px" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 18 18">
        <path fill="#494c4e" d="M9 0a9 9 0 0 0-9 9 8.654 8.654 0 0 0 .05.92 9 9 0 0 0 17.9 0A8.654 8.654 0 0 0 18 9a9 9 0 0 0-9-9zm5.42 13.42c-.01 0-.06.08-.07.08a6.975 6.975 0 0 1-10.7 0c-.01 0-.06-.08-.07-.08a.512.512 0 0 1-.09-.27.522.522 0 0 1 .34-.48c.74-.25 1.45-.49 1.65-.54a.16.16 0 0 1 .03-.13.49.49 0 0 1 .43-.36l1.27-.1a2.077 2.077 0 0 0-.19-.79v-.01a2.814 2.814 0 0 0-.45-.78 3.83 3.83 0 0 1-.79-2.38A3.38 3.38 0 0 1 8.88 4h.24a3.38 3.38 0 0 1 3.1 3.58 3.83 3.83 0 0 1-.79 2.38 2.814 2.814 0 0 0-.45.78v.01a2.077 2.077 0 0 0-.19.79l1.27.1a.49.49 0 0 1 .43.36.16.16 0 0 1 .03.13c.2.05.91.29 1.65.54a.49.49 0 0 1 .25.75z"/>
      </svg>)
    }
export default AdidasLogo