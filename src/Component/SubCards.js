import React, { useEffect,useRef,useState } from 'react'

const SubCards = ({subCardData,cardData,setcardData}) => {
  const [buttonRight,setbuttonRight] = useState(false)
  const [buttonLeft,setbuttonLeft]=useState(false)
  const subcardelement = useRef(null)
  useEffect(()=>{subcardelement.current.scrollWidth!==subcardelement.current.clientWidth&&setbuttonRight(true)},[])
  return (
    <div className='w-full relative mb-1'>
    <div ref={subcardelement}  className='flex w-full  mt-px overflow-auto scrollbar-none  '>
    {buttonLeft && <div onClick={()=>{setbuttonLeft(false);setbuttonRight(true);subcardelement.current.scrollTo({left:0,top:0,behavior:'smooth'})}} className='bg-white hover:bg-black hover:text-white absolute top-1/2 -translate-y-1/2 h-5 w-6 z-10  left-0 text-black leading-none '>&#8592;</div>}
      {buttonRight && <div onClick={()=>{setbuttonRight(false);setbuttonLeft(true);subcardelement.current.scrollTo({left:subcardelement.current.scrollWidth,top:0,behavior:'smooth'})}} className='bg-white hover:bg-black hover:text-white absolute top-1/2 -translate-y-1/2 h-5 w-6 z-10  right-0 text-black leading-none '>&#8594;</div>}
        <div className='after:bg-black after:w-full hover:after:h-[1.5px]  after:absolute after:bottom-0  relative  h-12 flex-shrink-0'><img src={cardData.image} className='h-full w-full' onMouseEnter={()=>{setcardData({name:cardData.name,image:cardData.image,hoverImage:cardData.hoverImage,price:cardData.price})}}></img></div>
        {subCardData.map((subCard, index)=><div key={index} className=' after:bg-black after:w-full hover:after:h-[1.5px] after:absolute after:bottom-0 relative h-12 flex-shrink-0 '><img src={subCard?.image}  className='h-full w-full' onMouseEnter={()=>{setcardData({name:subCard.name,image:subCard.image,hoverImage:subCard.altImage,price:subCard.pricing_information})}}/></div>)}
        
        </div>
        </div>
  )
}

export default SubCards