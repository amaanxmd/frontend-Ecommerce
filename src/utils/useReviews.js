import React, { useEffect,useState } from 'react'

const useReviews = (model_number,offset) => {
  if(!model_number){
    offset=-1
  }
  const[reviewList,setreviewList]=useState({totalReviews:null,productReviews:[]})
  function getReviews(){
    fetch(`https://www.adidas.co.in/api/models/${model_number}/reviews?bazaarVoiceLocale=en_IN&feature&includeLocales=en%2A&limit=7&offset=${offset}&sort=newest`)
    .then((result)=>result.json()).then((result)=>{setreviewList({totalReviews:result.totalResults,productReviews:[...reviewList.productReviews,...result.reviews]})})

  }
    // fetch("https://www.adidas.co.in/api/ugc/models/BSZ08/products/B75807?sort=rated")
    useEffect(()=>getReviews(),[offset])
  return reviewList
}

export default useReviews