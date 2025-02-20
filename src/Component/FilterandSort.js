import React, { useContext, useEffect, useRef, useState } from 'react'
import { filter } from '../utils/filter';
import { UserContext } from '../utils/userContext';

function sortData(filteredData,setfilteredData,flag,isSorted){
  
   if(flag==false){
      isSorted.current[0]=true;
      isSorted.current[1]=false;
   }else{
      isSorted.current[0]=false;
      isSorted.current[1]=true;
   }
const sorted =flag?filteredData.toSorted((a,b)=>b.pricing_information?.currentPrice-a.pricing_information?.currentPrice):filteredData.toSorted((a,b)=>a.pricing_information?.currentPrice-b.pricing_information?.currentPrice)
setfilteredData(sorted)
}


function handleSort(data,isSorted,setfilteredData){
   if(isSorted.current[0]){
      sortData(data,setfilteredData,0,isSorted)
   }else if(isSorted.current[1]){
      sortData(data,setfilteredData,1,isSorted)
   }else{
      setfilteredData(data)
   }
}

const FilterandSort = ({originalData,filteredData,setfilteredData,setprevAndNext}) => {
   
    const [filterandsort,setfilterandsort]=useState(true)
    const [sortSection ,setsortSection]=useState(false)
    const [showGender ,setshowGender]=useState(false)
    const [showBrand ,setshowBrand]=useState(false)
    const genderCategory= useRef([false,false,false])
    const brandCategory =useRef([false,false,false,false])
    const isSorted =useRef([false,false])
 
    

  return (
    <div className="ml-auto py-3">{filterandsort&&<button onClick={()=>setfilterandsort(false)}
    className="filter  px-3 py-2 border font-semibold border-black"
   
  >
    FILTER AND SORT
    
  </button>}
  {!filterandsort&&<div onClick={()=>setfilterandsort(!filterandsort)} className={`h-full w-full bg-black/20 z-10 fixed top-0 left-0`}></div>}
  {/* sideBar */}
  {!filterandsort&&<div className={`h-screen w-full sm:w-1/2 md:w-1/3 lg:w-1/4  bg-white fixed top-0 right-0 z-20 `}>
  {/* filter and sort */}
 <div className='flex justify-between py-6 border-b px-5'>
    <div className='font-semibold  text-lg'>Filter and Sort</div>
    <div className='text-lg' onClick={()=>setfilterandsort(!filterandsort)} >&#9587;</div>
 </div>
 {/* sort by */}
 <div>
 <div className='flex justify-between py-4 border-b px-5'>
    <div className='font-semibold text-base' >SORT BY</div>
    <div onClick={()=>setsortSection(!sortSection)} >&#x2630;</div>

 </div>
 {sortSection&&<div>
    <div className={' py-4 border-b px-5 relative after:content-[""] '+ (isSorted.current[0]?'after:h-full after:w-1 after:bg-black after:absolute after:top-0 after:left-0':"")} onClick={()=>{!isSorted.current[0]&&sortData(filteredData,setfilteredData,0,isSorted)}}>{"PRICE (LOW - HIGH)"}</div>
    <div className={' py-4 border-b px-5 relative after:content-[""] '+(isSorted.current[1]?'after:h-full after:w-1 after:bg-black after:absolute after:top-0 after:left-0':"")} onClick={()=>{!isSorted.current[1]&&sortData(filteredData,setfilteredData,1,isSorted)}}>{"PRICE (HIGH - LOW)"}</div>
    
    
    </div>}
 </div>
 {/* Gender*/}
 <div>
 <div className='flex justify-between py-4 border-b px-5'>
    <div className='font-semibold text-base' >Gender</div>
    <div onClick={()=>setshowGender(!showGender)} >&#x2630;</div>

 </div>
 {showGender&&<div className='py-4 border-b px-5'>
    <div className='flex gap-2' >
   <input onChange={()=>{handleSort((filter.call(genderCategory,"G",0,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}} checked={genderCategory.current[0]} id="men" type='checkBox'/>
   <label htmlFor='men'>Men</label>
    </div>
    <div className='flex gap-2' >
   <input onChange={()=>{handleSort((filter.call(genderCategory,"G",1,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}} checked={genderCategory.current[1]} id="women" type='checkBox'/>
   <label htmlFor='women'>Women</label>
    </div>
    <div className='flex gap-2' >
   <input onChange={()=>{handleSort((filter.call(genderCategory,"G",2,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}} checked={genderCategory.current[2]} id='unisex' type='checkBox'/>
   <label htmlFor='unisex'>Unisex</label>
    </div>
    </div>}
 </div>
 {/* Brand */}
 <div><div className='flex justify-between py-4 border-b px-5'>
    <div className='font-semibold text-base' >Brand</div>
    <div onClick={()=>setshowBrand(!showBrand)} >&#x2630;</div>

 </div>
 {showBrand && <div className='py-4 px-5  border-b'>
    <div className='flex gap-2'>
   <input onChange={()=>{handleSort((filter.call(brandCategory,"B",0,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}}  checked={brandCategory.current[0]} id='performance' type='checkBox'/>
   <label htmlFor='performance'>Performance</label>
    </div>
    <div className='flex gap-2'>
   <input id='sportswear' type='checkBox' checked={brandCategory.current[1]} onChange={()=>{handleSort((filter.call(brandCategory,"B",1,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}}/>
   <label htmlFor='sportswear'>Sportswear</label>
    </div>
    <div className='flex gap-2'>
   <input id="originals" type='checkBox' checked={brandCategory.current[2]} onChange={()=>{handleSort((filter.call(brandCategory,"B",2,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}}/>
   <label htmlFor ="originals">Originals</label>
    </div>
    <div className='flex gap-2'>
   <input id='Terrex' type='checkBox' checked={brandCategory.current[3]} onChange={()=>{handleSort((filter.call(brandCategory,"B",3,originalData)),isSorted,setfilteredData),setprevAndNext({prev:0,next:20})}}/>
   <label htmlFor='Terrex'>Terrex</label>
    </div>
    
    </div>}
 </div>
 <div className='absolute bottom-4 px-5 pt-4 border-t flex flex-col w-full'>
  <button onClick={()=>setfilterandsort(!filterandsort)} className="relative flex justify-between text-start bg-black  text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-0.5 after:left-1 "><span className='text-bold'>{`APPLY (${filteredData.length})`}</span><span>&#8594;</span> </button>
  </div>
  </div>}
  </div>
  )
}

export default FilterandSort