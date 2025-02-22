import { useDispatch, useSelector } from "react-redux"
import CardComponent, {CardComponentwithoutButton} from "./CardComponent"
import { clearCart,addItem } from "../utils/slice"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection,getDocs,updateDoc ,doc,deleteDoc} from "firebase/firestore"
import { db,auth } from "../utils/firebase"
import { onAuthStateChanged } from "firebase/auth"


 const Cart=()=>{
const dispatch = useDispatch()
const card = useSelector((store)=>store.cart.myitems.length)
const [cartData,setcartData]=useState([])

// const count = useSelector((store)=>{return store.cart.count[index]})
// useEffect(()=>{getAllData()},[card])
useEffect(()=>{onAuthStateChanged(auth,(user)=>{ if(user){getAllData()}else{setcartData([])}})},[card])


const getAllData = async()=>{
  try{

  if(auth.currentUser){

  
      const querySnapshot = await getDocs(collection(db, auth.currentUser.uid));
      // console.log(querySnapshot)
      // console.log("chal rha hia kay")
      const temp =[]
    querySnapshot.forEach((doc) => {
      
      // doc.data() is never undefined for query doc snapshots

      temp.push(doc.data())
    });
    setcartData(temp)
    // console.log(cartData)
    }
  }catch(e){
    setcartData([])
    console.log(e)
  }
    }

async function clearcart(){

    dispatch(addItem({length:0}))
    await updateDoc(doc(db,auth.currentUser.uid+"cart",auth.currentUser.uid+"cartItems"),{
      cartItems:0
    })
 
    cartData.map(async (data)=>{await deleteDoc(doc(db,auth.currentUser.uid,data.cardInfo.id))})
    setcartData([])


}
return <div className="px-4 md:px-16 lg:px-32 ">{cartData?.length!==0?<div className=" pt-6 "><button className=" flex px-3 py-2 border font-semibold border-black ml-auto" onClick={clearcart}>clear cart</button><div className="cardContainer flex pb-60 md:pb-52 lg:pb-64 overflow-hidden gap-x-1 sm:gap-x-3 gap-y-4  flex-wrap  border-t pt-3" >
{/* {card.map((cardInfo,index)=><CardComponent key={index} index={index} cardInfo={cardInfo}/>)} */}
{/* {cartData?.map((doc)=>{return <CardComponent index={Object.keys(doc)[0]} key ={Object.keys(doc)[0]} cardInfo={doc["cardInfo"]}/>})} */}
{cartData.length&&cartData?.map((doc)=>{ if(doc[Object.keys(doc)[0]]>1){ return [<CardComponent index={Object.keys(doc)[0]} key ={0} cardInfo={doc["cardInfo"]}/>,<CardComponent index={Object.keys(doc)[0]} key ={1} cardInfo={doc["cardInfo"]}/>] } else{return <CardComponent index={Object.keys(doc)[0]} key ={doc["cardInfo"].id} cardInfo={doc["cardInfo"]}/>}})}
{
    
}

</div></div>:<div className="flex   pt-12 sm:pt-20 gap-y-8 flex-col items-start "><h1 className="text-black font-bold text-4xl">{auth.currentUser?"YOUR BAG IS EMPTY":"YOU ARE NOT SIGNED  IN"}</h1><p>{auth.currentUser?"Once you add something to your bag - it will appear here. Ready to get started?":"Sign in to get latest deals on adidas"}</p><Link className="w-full" to={auth.currentUser?"/":"/signin"}><button className="  relative  bg-black -mt-2 text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-1 after:left-1 ">{auth.currentUser?"GET STARTED":'SIGN IN' }&#8594;</button></Link></div>}

</div>

}
export default Cart;