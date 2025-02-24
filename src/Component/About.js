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

return ( <div className="grow aboutBody w-full "> 

 
<div ref={container} className=" w-full h-full flex flex-col relative  ">

  { <div  className={`w-full  h-full flex flex-col md:flex-row  md:shrink-0  px-2 sm:px-6 md:px-8 lg:px-14 md:gap-0 gap-6 `}>
  <div className="md:w-1/2 shrink-0 md:self-end md:pb-32 "><div className="flex flex-col  items-start pl-4"><span className="mt-3 md:mt-0 ml-2 text-xs md:text-base">ABOUT</span><h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">PROFILE</h1> </div></div>
  <div className="h-full w-full md:w-1/2 shrink-0"><img className="h-full w-full" alt='Profile'  src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_700,h_700/v1705909812/adidas-group/images/profile_fvaogz.jpg"/></div>
  </div>}
  <p className=" px-2 sm:px-6 md:px-32 lg:px-64  text-base sm:text-xl leading-relaxed [word-spacing:2px] tracking-wide mt-12 mb-6">Everything we do is rooted in sport. Sport plays an increasingly important role in more and more people’s lives, on and off the field of play. It is central to every culture and society, and is core to our health and happiness. </p>
  <div className="px-2 sm:px-6 md:px-32 lg:px-64 flex flex-col gap-y-10 text-base sm:text-xl leading-relaxed [word-spacing:2px] tracking-wide">

   <div className="keyFacts flex flex-col ">

   <h1 className="font-bold text-2xl sm:text-3xl">KEY FACTS</h1>
   <img alt='keyFacts' src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1000/v1730210300/adidas-group/profile/2024/Adidas_Company_Onepager_FY2023_EN_11_11_xe0axf.png"/>
  <p>Key to our success are our people and our culture. They bring our identity to life, defined by our purpose and mission.</p>
   </div>
   <div className="ourPurpose flex flex-col gap-y-6 ">

   <h1 className="font-bold text-2xl sm:text-3xl">OUR PURPOSE</h1>
   <img alt='keyFacts' src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1000/v1705910723/adidas-group/images/purpose_en_zs9gg0.jpg"/>
  <p>Our purpose, ‘Through sport, we have the power to change lives,’ guides the way we run our company, how we work with our partners, how we create our products, and how we engage with our consumers. We will always strive to expand the boundaries of human possibility, to include and unite people in sport, and to create a more sustainable world.</p>
   </div>
   <div className="ourMission flex flex-col gap-y-6">

   <h1 className="font-bold text-2xl sm:text-3xl">OUR MISSION</h1>
   <img alt='keyFacts' src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1000/v1710174644/adidas-group/images/2024/Misson-en-03-2024_x6irvw.png"/>
  <p className="mt-8">Athletes do not settle for average. And neither do we. We have a clear mission: To be the best sports brand in the world. Every day, we come to work to create and sell the best sports products in the world, and to offer the best service and consumer experience – and to do it all in a sustainable way. We are the best when we are the credible, inclusive, and sustainable leader in our industry.</p>
   </div>
   <div className="relative   "><div className="absolute top-0 left-0 w-full h-full bg-black/30"></div><img className="h-full w-full" alt="discoverHistory" src="https://res.cloudinary.com/confirmed-web/image/upload/v1705911092/adidas-group/teaser/discover-our-story_amzzxz.jpg"/></div>
  </div>

  {/* <div  className={`w-full h-full flex shrink-0  `}>
  <div className="w-1/2 shrink-0 self-end pb-32 "><div className="flex flex-col  items-start pl-4"><span className="ml-2">RESULTS</span><h1 className="text-5xl font-bold">ADIDAS CONTINUES TO GROW DOUBLE DIGITS IN THE THIRD QUARTER OF 2024</h1> <button className="relative bg-black mt-6 text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-1 after:left-1 ">READ MORE &#8594;</button></div></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full"  src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1730179527/adidas-group/press-releases/2024/Q3_Press_Release_Selected_kyqrvh.jpg"/></div>
  </div>
  <div className={`flex shrink-0 w-full`}>
  <div className="w-1/2 shrink-0"><h1 className="bg-red-500 w-full">sustainibility in adidaas in pracice everyday</h1></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full" src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1705919239/adidas-group/sustainability/our_targets_header_cvrucn.jpg"/></div>
   </div>
   <div className={`flex shrink-0 w-full  `}>
  <div className="w-1/2 shrink-0"><h1>chalo phiro swast raho</h1></div>
  <div className="w-1/2 shrink-0"><img className="h-full w-full" src="https://res.cloudinary.com/confirmed-web/image/upload/c_lfill,w_1200/v1706002867/adidas-group/people-and-culture/where_we_play_header_dyistg.jpg"/></div>
  </div> */}
</div>





</div>)
    
}

export default About;

// onClick={()=>{console.log(scroll);scroll.current.scrollBy((scroll.current.scrollWidth)/3,0)}} 
{/* <div  className={`w-full h-full flex shrink-0 ${scroll===0?"-left-full ":scroll===1?"left-0 transition-all duration-500 ease-in-out":"left-full transition-all duration-500 ease-in-out"}  absolute `}></div> */}