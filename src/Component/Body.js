import CardComponent  from "./CardComponent";
import {Shimmer} from "./Shimmer";
import useCardData from "../utils/useCardData";
import { useState, useEffect } from "react";
import { useOnline } from "../utils/useOnline";
import FilterandSort from "./FilterandSort";





const Body = () => {
  
  
 
  const originalData = useCardData()
  const [filteredData,setfilteredData]=useState(originalData)
  const [prevAndNext,setprevAndNext]=useState({prev:0,next:20})
 const arrForshimmer = Array(20).fill(0)
 
  
  useEffect(() => {
   
    if (originalData.length > 0) {
      setfilteredData(originalData);
    }
  }, [originalData]);

  
  const status =useOnline()
// if(status ===false){return <div>Please turn on the internet connection</div>}
  return  (
    <div className={`sm:px-4 md:px-16 lg:px-32 ${filteredData.length<20 && "pb-64"} pb-32`}>
     
    
      <div className="filterResetInput px-2 sm:px-0 flex">
        
        <FilterandSort setprevAndNext={setprevAndNext} originalData ={originalData} filteredData ={filteredData} setfilteredData ={setfilteredData}/> 
         

      </div>
      <div className="cardContainer  flex gap-x-1 sm:gap-x-3 gap-y-4   flex-wrap  border-t pt-3 ">
        
        {originalData.length===0?arrForshimmer.map((_,index)=><Shimmer key={index}/>):
        
         filteredData.slice(prevAndNext.prev,prevAndNext.next).map((data,index) => {
          
         return data? <CardComponent key={data.id} cardInfo={data} index={index} />:<Shimmer key={index}/>
          
        })}
         
      </div>
      {filteredData.length>20&&<div className="flex justify-center gap-x-2 pt-16">
        
        
        <button disabled={prevAndNext.prev<=0?true:false} onClick={()=>{setprevAndNext({prev:prevAndNext.prev<=0?0:prevAndNext.prev-20,next:prevAndNext.prev<=0?prevAndNext.next:prevAndNext.next-20})}} className={`border ${prevAndNext.prev<=0 && "bg-gray-100"} border-black px-4 py-2`}>Previous</button>
        <button disabled={prevAndNext.next>=filteredData.length?true:false} onClick={()=>{setprevAndNext({prev:prevAndNext.next>=filteredData.length?prevAndNext.prev:prevAndNext.prev+20,next:prevAndNext.next>=filteredData.length?prevAndNext.next:prevAndNext.next+20})}}  className={`border ${prevAndNext.next>=filteredData.length&& "bg-gray-100"} border-black px-4 py-2`}>Next</button>
        
        
        </div>}
       
    </div>
  );
};
const Error = ()=>{
  return <div>no data found</div>
} 
export default Body;



