import { useDispatch, useSelector } from "react-redux";
import img2 from "../../assets/bag.png";
import { Link, useLocation } from "react-router-dom";
import { addItem } from "../utils/slice";
import { removeItem,manageCount } from "../utils/slice";
import AdidasLogo from "./LogoSvgs";
import { useEffect, useState } from "react";
import SubCards from "./SubCards";
import { auth,db } from "../utils/firebase";
import { addDoc,collection,getDocs,deleteDoc ,setDoc,doc,updateDoc,getDoc} from "firebase/firestore";

const CardComponent = (prop) => {
  const {cardInfo, cardInfo:{id,name,pricing_information,product_listing_assets:images,attribute_list,product_link_list:subCardData,},index  } = prop;
  const [imageHovered,setimageHovered]=useState(false)
  const [addToCart,setaddToCart]=useState(false)
  const  [cardData,setcardData]=useState({image:images[0].image_url,price:pricing_information,name:name,hoverImage:images[1].image_url})
  // const [count,setcount]=useState(0)
 
  const dispatch = useDispatch()
  const count = useSelector((store)=>{return store.cart.count[index]})
  const cartItems =useSelector((store)=>{return store.cart.myitems.length})
  useEffect(()=>{getCart();getCartCount()},[])
  const getCartCount =async()=>{
    try{
     if(auth.currentUser){

     
    
    const docRef = doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems")
    const document =await getDoc(docRef)
    if (document.exists()) {
      // console.log("Cart Data:", document.data().cartItems);
      dispatch(addItem({length:document.data().cartItems}))
      console.log(cartItems)
       
    }
  }
  }catch(e){
    console.log(e)
  }
  }
   const getCart = async ()=>{
    try{

      docSnap= await getDoc(doc(db,auth.currentUser?.uid,cardInfo.id))
      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data()[index]);
        dispatch(manageCount({[index]:docSnap.data()[index]}))
        // dispatch(addItem())
        // console.log({[index]:docSnap.data()[index]})
        // console.log("holdup")
        // dispatch(addItem([]))
        // setcount(docSnap.data()[index])
      } else {
        // docSnap.data() will be undefined in this case
        // console.log("No such document!");
        dispatch(manageCount({[index]:0}))
        // console.log("doesn't exist")
        // dispatch(addItem([]))
        // setcount(0) ;
      }
    }catch(e){
      // console.log(e)
    }
  
  }

  const path =useLocation()

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
      }
    }
    else{
      alert("More Than 2 Items are not allowed")
    }
  }

  async function removeFromDataBase(){
    if(count==1){
      const cardRef  = doc(db,auth.currentUser?.uid,cardInfo.id)

      await deleteDoc(cardRef)
      dispatch(manageCount({[index]:0}))
      dispatch(removeItem())
      await setDoc(doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems"),{cartItems:cartItems-1})
    }else{
      const cardRef= doc(db, auth.currentUser?.uid, cardInfo.id);
      await updateDoc(cardRef, {
      [index]:count-1// Updating the population field
      
      
       })
      //  ;console.log(index);console.log(count-1);
       // setcount(2)
       dispatch(manageCount({[index]:count-1}))
      //  console.log({[index]:count-1})
       dispatch(removeItem())
       await setDoc(doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems"),{cartItems:cartItems-1})
    }
  }
  
//   async function sendToDataBase(){

//     if(count<2){
//  dispatch(addItem({cardInfo,index})) 
//  if(count===1){
//   const cardRef= doc(db, "users", cardInfo.id);
//   await updateDoc(cardRef, {
//     [index]:2// Updating the population field
//   });
  
// }
// else{
//   await setDoc(doc(db, "users", cardInfo.id), {
//     cardInfo,[index]:1
//   });
// }
//  }
 
//     else{
//       alert("More Than 2 Items are not allowed")
//     }
//   }

  // async function removeFromDataBase(){
  //   dispatch(removeItem({index}))
  //   const cardRef= doc(db, "users", cardInfo.id);
  //   await updateDoc(cardRef, {
  //     [index]:count-1// Updating the population field
  //   });
    
  //   // await deleteDoc(doc(db, "users", ));
  //   // const querySnapshot = await getDocs(collection(db, "users"));
    
  //   //   querySnapshot.docs.map((data)=>console.log(JSON.stringify(data.data())))
    
  // }
  
    
     
  function addItems(){
      
            if(count<2){
        dispatch(addItem({cardInfo,index}))
        
        
      }
        else{
          alert("More Than 2 Items are not allowed")
        }
    }
    function removeItems(){
      dispatch(removeItem({index}))
      
    }
    
    return (
      <div onMouseEnter={()=>{setaddToCart(true)}} onMouseLeave={()=>{setaddToCart(false);setcardData({image:images[0].image_url,price:pricing_information,name:name,hoverImage:images[1].image_url})}} className={ ('w-[calc((100%-4px)/2)] sm:w-[calc((100%-24px)/3)] md:w-[calc((100%-36px)/4)] lg:w-[calc((100%-36px)/4)] ')+(addToCart?'h-1 z-10':'h-full') }>
        <div className="container w-full  hover:border-2 hover:border-black relative bg-white" >
          <div onMouseEnter={()=>setimageHovered(true)} onMouseLeave={()=>{setimageHovered(false)}}>
          <div className="header flex justify-between w-full absolute top-0 px-2 py-2">
            
            <AdidasLogo width={30}/>
            <div className="bagandcoutWrapper flex relative">
            <img src={img2} alt="bagIcon" className='bag w-6' />
            

            </div>
          </div>
          <div className="imgWrapper">
          { id && <Link to={`/${id}`} state={{index,cardInfo}}>{imageHovered?<img className="img "  src={cardData.hoverImage} alt="shoeimage" />:<img className="img" src={cardData.image} alt="shoeimage" />}</Link>}
          </div>
          </div>
          {addToCart &&<SubCards cardData={{image:images[0].image_url,price:pricing_information,name:name,hoverImage:images[1].image_url}} setcardData={setcardData} subCardData ={subCardData} />}
          <div className="content px-4">
          {cardData.price.standard_price===(cardData.price.currentPrice||cardData.price.sale_price||cardData.price.standard_price)?<div className="font-semibold text-sm tracking-wider mb-2 ">{cardData.price.standard_price.toFixed(2)}</div>:<div className="pricingWrapper mb-2"><div className="text-red-700 font-semibold text-sm tracking-wider">{cardData.price.sale_price?.toFixed(2)||cardData.price.currentPrice?.toFixed(2)}</div><div className="flex flex-wrap gap-2" ><span className="line-through decoration-1 text-xs tracking-wider text-gray-500">{cardData.price.standard_price.toFixed(2)}</span><span className="text-red-600 text-xs tracking-wider">{cardData.price.discount_text||"-"+(Math.ceil((cardData.price.standard_price-cardData.price.sale_price)*100/cardData.price.standard_price))+"%"}</span><span className="text-xs text-gray-500">Original price</span></div></div>}
            
              <h1 className="text-sm ">{cardData.name}</h1>
              
               
              <div className="text-sm text-gray-500">{attribute_list.gender==="M"?"Men "+attribute_list.sport[0]:attribute_list.gender==="W"?"Women "+attribute_list.sport[0]:attribute_list.brand}</div>
              <div className="text-sm text-gray-500">{subCardData.length+1+" colours"}</div>
            {auth.currentUser?.email&&addToCart&&<div className="buttonWrapper  mt-4 mb-4">
              <button className="addCart  text-black border  w-full py-2 px-1 " onClick={()=>{path.pathname==="/"?sendToDataBase():removeFromDataBase()}}>{path.pathname==="/"?"Add to Cart":"Remove from Cart"}</button>
            </div>}
          </div>
        </div>
      </div>
      
    );
  };



  

  export default CardComponent;