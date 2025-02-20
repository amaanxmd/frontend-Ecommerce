import { useRef,useState } from "react";




const About=()=>{

const [scroll, setscroll]=useState(0)
const  container = useRef(null)
function swipe(){
const parent =window.getComputedStyle(container.current)
const child =Array.from(container.current.children)
const children =child.map((element)=>window.getComputedStyle(element))
const firstElem=children[0].getPropertyValue("left")
// const secondElem=children[1].getPropertyValue("left")
// const thirdElem=children[2].getPropertyValue("left")

const parentWidth=parent.getPropertyValue('width')

function handleClick(computedStyle,i){
  if(computedStyle.getPropertyValue("left")===parentWidth){
     this[i].style.transitionDuration="0s";
     this[i].style.left="-100%"
     this[i].style.transform="translateX(100%)"
     console.log(computedStyle.getPropertyValue("left"))
     console.log(this[i].style.left)
    
     
     console.log(this[i].style.transform)
  }else if(computedStyle.getPropertyValue("left")==="-"+parentWidth){
    this[i].style.transitionDuration="500ms"
    this[i].style.left='0px';
    // console.log(computedStyle.getPropertyValue("left"))
  }else{
    this[i].style.transitionDuration="500ms"
    this[i].style.left="100%"
    // console.log(computedStyle.getPropertyValue("left"))
  }

}

children.map(handleClick.bind(child))

// if(firstElem===parentWidth)
// {
//   // console.log(children[0])
 
//   child[0].style.transitionDuration='0s'
//   child[0].style.left="-100%"
//   console.log(child[0].style.left)

  
// }else{
  
//   child[0].style.transitionDuration='500ms'
//   if(child[0].style.left==="-100%"){child[0].style.left='0px';console.log(child[0].style.left);console.log(firstElem)}
//   else{child[0].style.left= "100%";console.log(child[0].style.left)}
// }

}

return ( <div className="aboutBody w-full "> 

 <button onClick={swipe} className="border absolute z-10 right-0 top-1/2"  >press me</button>
<div ref={container} className="w-full h-screen flex relative overflow-hidden ">
  <div  className={`w-full h-full flex shrink-0 -left-full  transition-all duration-500 ease-in-out absolute `}>
  <div className="w-1/2 shrink-0 self-end pb-32 "><div className="flex flex-col  items-start pl-4"><span className="ml-2">RESULTS</span><h1 className="text-5xl font-bold">ADIDAS CONTINUES TO GROW DOUBLE DIGITS IN THE THIRD QUARTER OF 2024</h1> <button className="relative bg-black mt-6 text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-1 after:left-1 ">READ MORE &#8594;</button></div></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full"  src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1730179527/adidas-group/press-releases/2024/Q3_Press_Release_Selected_kyqrvh.jpg"/></div>
  </div>
  <div className={`flex shrink-0 w-full left-0 transition-all duration-500 ease-in-out absolute`}>
  <div className="w-1/2 shrink-0"><h1 className="bg-red-500 w-full">sustainibility in adidaas in pracice everyday</h1></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full" src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1705919239/adidas-group/sustainability/our_targets_header_cvrucn.jpg"/></div>
   </div>
   <div className={`flex shrink-0 w-full left-full transition-all duration-500 ease-in-out absolute `}>
  <div className="w-1/2 shrink-0"><h1>chalo phiro swast raho</h1></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full" src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1706002867/adidas-group/people-and-culture/where_we_play_header_dyistg.jpg"/></div>
  </div>
</div>
 <button className="border absolute left-0 top-1/2" >press me</button>




</div>)
    
}

export default About;

// onClick={()=>{console.log(scroll);scroll.current.scrollBy((scroll.current.scrollWidth)/3,0)}} 
{/* <div  className={`w-full h-full flex shrink-0 ${scroll===0?"-left-full ":scroll===1?"left-0 transition-all duration-500 ease-in-out":"left-full transition-all duration-500 ease-in-out"}  absolute `}></div> */}