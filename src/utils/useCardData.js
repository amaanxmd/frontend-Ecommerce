import { useDispatch, useSelector } from "react-redux";
import { shoeIds } from "./shoeId";
import { useState,useEffect } from "react";
import { addCards } from "./cardSlice";



function getApi(id) {
    
    if(!id){let data = shoeIds.map(function (val) {
      return fetch(`https://www.adidas.co.in/api/products/${val}`)
        .then(function (data) {
          return data.json();
        })
        .then(function (json) {
          return json;
        }).catch((e)=>{console.log(e);return false});
    });
  
    return Promise.all(data);}else{
      return fetch(`https://www.adidas.co.in/api/products/${id}`)
      .then(function(data){
        return data.json();
      }).catch((e)=>{console.log(e);})
    }
  }

  const useCardData = (id)=>{
    
    const[cardData,setCardData]=useState([])
    const dispatch = useDispatch()
    const cardArray = useSelector((store)=>{return store.cardSlice.card}) 
    useEffect(()=>{if(id&&cardArray.length){setCardData(cardArray.find((obj)=>obj.id===id))}})
    useEffect(()=>{if(!cardArray.length){{getApi().then((dataArray) => {
      
          dispatch(addCards(dataArray))
        setCardData(dataArray)

        
     })}}else{setCardData(cardArray)}},[])



  return  cardData
  }

  export default useCardData