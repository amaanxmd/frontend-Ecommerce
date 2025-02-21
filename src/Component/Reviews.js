import React, { useEffect } from 'react'
import { useState } from 'react'
import useReviews from '../utils/useReviews'

const Reviews = ({accorOpen,setaccorOpen,model_number}) => {
    function handleRating(rating){
      switch(rating){
        case 1:
            return "★☆☆☆☆"

        case 2:
            return '★★☆☆☆'
        case 3:
            return "★★★☆☆"
        case 4:
            return "★★★★☆"
        case 5:
            return "★★★★★"


      }
    }
  const [offset,setoffset] =useState( 0)
  const [showBigger,setshowBigger]=useState([])
  const reviewList = useReviews(model_number,offset)
  
  return reviewList?<div className='border-b-2 border-t-2 py-8'>
        <div className='flex justify-between items-center'>
            <p className='font-bold'>Reviews</p>
            <p className={`text-5xl ${accorOpen[0]?"-rotate-90":"rotate-90"} pb-4 `} onClick={()=>setaccorOpen([!accorOpen[0],0,0])}>&rsaquo;</p>
        </div>
        {accorOpen[0]?<div className='relative'>
           
           { reviewList.map((reviews,index)=><div key={index} className='flex justify-between py-6 border-b-2'>

            <div className='w-1/3'>
                <h2>{handleRating(reviews.rating)}</h2>
                <h2 className='font-bold mt-4'>{reviews.userNickname}</h2>
            </div>
            <div className='w-2/3'>
               <div className='flex justify-between gap-x-6'>
                <p className='font-bold mb-4'>{reviews.title}</p>
               <p className='shrink-0'>{reviews.formattedDate}</p>
               
               </div>
               <div>
               <p>{reviews.text}</p>
               <div className='flex gap-x-2 relative  md:gap-4 w-full md:flex-wrap py-3 overflow-auto'>
               {reviews.photos.map((img,index)=><img key={index} onClick={(e)=>setshowBigger([true,e])} className='h-32 shrink-0' src={img.normalUrl}/>)}
               {showBigger[0]&&<div className='fixed h-1/2 md:h-[90vh] w-max md:w-auto  top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2 z-20  overflow-auto'><div onClick={()=>setshowBigger([false])} className='p-4 bg-white text-black absolute top-0 right-0 '>&#x2716;</div><img className='h-full w-full md:h-auto md:w-auto' src={showBigger[1].target.src}/></div>}
               {showBigger[0] && <div className='h-screen w-full fixed z-10 top-0 left-0 bg-black/10'></div>}
               </div>
               </div>
            </div>


           </div>)}
            <div className='relative flex w-full pt-8 items-center justify-center'>
            <button className='border-black border p-4 font-bold ' onClick={()=>{setoffset(offset+7)}}>Read More Reviews</button>
             </div>
        </div>:null}
    </div>:""

  
}

export default Reviews