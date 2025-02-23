import { Link, useLocation, useParams,useNavigate } from "react-router-dom"
import { useOnline } from "../utils/useOnline"
import useCardData from "../utils/useCardData"
import { useReview } from "../utils/useReview"
import { Accordion } from "./accordion"
import { useEffect, useState } from "react"
import Footer from "./Footer"
import { onAuthStateChanged } from "firebase/auth"
import { auth,db } from "../utils/firebase"
import { setDoc, doc,updateDoc} from "firebase/firestore"
import { useDispatch,useSelector } from "react-redux"
import { manageCount,addItem } from "../utils/slice"


const ProductDetails =()=>{
  const location =useLocation()
  const navigate =useNavigate()
  const [index,setindex] = useState(location.state?.index)
  
  const [cardInfo,setcardInfo]=useState(location.state?.cardInfo)
 
  const dispatch = useDispatch()
  const count = useSelector((store)=>{return store.cart.count[index]})
  const cartItems =useSelector((store)=>{return store.cart.myitems.length})
  async function sendToDataBase(){
      if(count<2 && count>=0){
        if(count===1){
          const cardRef= doc(db, auth.currentUser?.uid, cardInfo.id);
           await updateDoc(cardRef, {
           [index]:2// Updating the population field
            });
            // setcount(2)
            dispatch(manageCount({[index]:2}))
            // console.log({[index]:2})
            dispatch(addItem())
            await setDoc(doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems"),{cartItems:cartItems+1})
            console.log(cartItems)
            console.log("kaun sa chal rha")
        }
        else{
          await setDoc(doc(db, auth.currentUser?.uid, cardInfo.id), {
                cardInfo,[index]:1
              });
              // setcount(1)
              dispatch(manageCount({[index]:1}))
              dispatch(addItem())
              // console.log({[index]:1})
              await setDoc(doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems"),{cartItems:cartItems+1})
              console.log(cartItems)
              console.log("ye wala")
        }
      }
      else{
        alert("More Than 2 Items are not allowed")
      }
    }

  function handleScroll(e){
   
    if(e.target.firstChild.textContent==="\u203A")
    
   {e.target.parentNode.firstChild.scrollBy({left:e.target.parentNode.firstChild.firstChild.clientWidth,behavior:"smooth"})}
   else{
    e.target.parentNode.firstChild.scrollBy({left:"-"+e.target.parentNode.firstChild.firstChild.clientWidth,behavior:"smooth"})
   }

  }
//  console.log(cardInfo)
//  console.log(index)
  const[availability,setavailability]=useState(null)
  const [buttonText,setbuttonText]=useState(null)
  useEffect(()=>{if(!cardInfo){navigate("/")}})
  const {id} =useParams()
  function getAvalabilityStatus(){
    fetch(`https://www.adidas.co.in/api/products/${id}/availability`).then((result)=>result.json()).then((result)=>setavailability(result)).catch((e)=>console.log(e))
  }
  useEffect(()=>{getAvalabilityStatus()},[])
  useEffect(()=>{onAuthStateChanged(auth,(user)=>{if(user){setbuttonText("ADD TO BAG")}else{setbuttonText("SIGN IN")}})},[])
const [currentSizeSelected,setcurrentSizeSelected]=useState(null)
  const [showMore,setshowMore]=useState(null)
 
  const currentCardData = useCardData(id)


return (
  <div className="flex w-full   overflow-x-hidden flex-col md:flex-row flex-wrap">
    <div className="md:w-2/3 ">
      <div className="relative  ">
        <div
          className={
            " flex snap-x snap-mandatory     md:grid overflow-auto scrollbar-none     md:grid-flow-row md:grid-cols-2 w-full " +
            (showMore ? "md:h-full  " : "md:h-screen md:overflow-hidden ")
          }
        >
          {(cardInfo.view_list||currentCardData.view_list)?.map((properties, index) =>
            index === 1 ? (
              properties.video_url ? (
                <video
                  key={index}
                  className=" snap-start aspect-video md:h-full w-full object-cover"
                  autoPlay
                  muted
                >
                  <source src={properties.video_url} type="video/mp4" />
                </video>
              ) : (
                <div
                  key={index}
                  className="snap-start shrink-0 w-full h-full overflow-clip"
                >
                  <img
                    className="hover:scale-150 h-full w-full aspect-square  transition-transform duration-500"
                    src={properties.image_url}
                  />
                </div>
              )
            ) : (
              <div
                key={index}
                className=" snap-start h-full w-full  shrink-0  overflow-clip"
              >
                <img
                  className="hover:scale-150 h-full w-full aspect-square transition-transform duration-500"
                  src={properties.image_url}
                />
              </div>
            )
          )}
          <button
            onClick={() => {
              setshowMore(!showMore);
            }}
            className=" hidden md:inline md:p-2 md:border  md:border-black md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2  "
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
        <button
          onClick={handleScroll}
          className="absolute  text-8xl leading-[0px] top-1/2 left-0 inline md:hidden"
        >
         {"\u2039"}
        </button>
        <button
          onClick={handleScroll}
          className="absolute  text-8xl leading-[0px] -mt-1 top-1/2 right-0 inline md:hidden"
        >
         {"\u203A"}
        </button>
      </div>
      <Accordion currentCardData={cardInfo||currentCardData} />
      
    </div>

    <div className=" md:w-1/3    px-6 flex flex-col gap-y-6 py-6">
    

    
      <div className="flex justify-between">
        <div>{cardInfo.attribute_list?.brand|| currentCardData.attribute_list?.brand}</div>
        {/* <div>{"stars"}</div> */}
      </div>
      <h1 className=" text-2xl md:text-4xl font-bold">
        {cardInfo.name|| currentCardData.name}
      </h1>
      <p className="text-sm text-gray-700">
        MRP in Indian currency: <br></br>
        <span className="font-bold">
          {cardInfo.pricing_information?.currentPrice.toFixed(2)||currentCardData.pricing_information?.currentPrice.toFixed(2)}
        </span>
        &nbsp; per pair <br></br>
        (Inclusive of all taxes)
      </p>
      <div>
        <h2 className="mb-2 font-bold text-2xl">sizes</h2>
        <div className=" grid grid-cols-4 gap-2 text-center ">
          {availability?.variation_list?.map((data, index) => (
            <div
              key={index}
              onClick={(e) => {
                Array.from(e.target.parentNode.children).map((ele, indx) => {
                  if (
                    index === indx &&
                    availability?.variation_list[indx]?.availability_status !==
                      "NOT_AVAILABLE"
                  ) {
                    ele.style.backgroundColor = "black";
                    ele.style.color = "white";
                  } else if (
                    index === indx &&
                    availability?.variation_list[indx]?.availability_status ===
                      "NOT_AVAILABLE"
                  ) {
                    ele.style.color = "white";
                    ele.style.backgroundColor = "#4b5563";
                  } else if (
                    availability?.variation_list[indx]?.availability_status ===
                    "IN_STOCK"
                  ) {
                    ele.style.backgroundColor = "#e2e8f0";
                    ele.style.color = "black";
                  } else {
                    ele.style.backgroundColor = "#faf8fc";
                    ele.style.color = "black";
                  }
                });
              }}
              className={`p-4 ${
                data.availability_status === "NOT_AVAILABLE"
                  ? "line-through bg-slate-50 hover:!bg-gray-600 hover:!text-white"
                  : "bg-slate-200 hover:!bg-black  hover:!text-white"
              }`}
            >
              {data.size}
            </div>
          ))}
        </div>
      </div>
      
      <button
      onClick={()=>{auth.currentUser?sendToDataBase():navigate("/signIn")}}
        
        className="relative flex justify-between w-full text-start bg-black  text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-0.5 after:left-1 "
      >
        <span className="text-bold">{buttonText}</span>
        <span>&#8594;</span>{" "}
      </button>
      

      <div className="px-6">
        <ul className="flex flex-col gap-y-2">
          

          <li className="list-disc " >Free Delivery, Free Returns</li>
        
          <li className="list-disc ">Delivery: Delhi, Gurgaon: 1-2 Days, Metro cities:2-3 days , Others: 3-5 days</li>

          <li className="list-disc ">COD available for orders below ₹5000</li>
          <li className="list-disc ">Secure transactions with hassle free 14 days Exchange and Returns</li>
          <li className="list-disc ">Save 5% on all Online Payments under Rs 5000/-</li>
        </ul>
      </div>
      
    </div>
    
  </div>
);
  


}

export default ProductDetails;