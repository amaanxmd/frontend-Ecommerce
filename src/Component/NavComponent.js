import img3 from "../../assets/lebron-nike.png";
// import img4 from "../../assets/shoe.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useOnline } from "../utils/useOnline";
import { UserContext } from "../utils/userContext";
import { useContext, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdidasLogo from "./LogoSvgs";
import { onAuthStateChanged ,signOut, } from "firebase/auth";
import { auth,db } from "../utils/firebase";
import { getDocs,collection,getCountFromServer,doc,getDoc } from "firebase/firestore";
import { addItem } from "../utils/slice";

import User from "./User"

const NavComponent = () => {
  const dispatch =useDispatch()
  const {user}=useContext(UserContext)
  const path = useLocation()
  const navigate = useNavigate()
  const [account,setaccount]=useState(false)
  const [hamburger,sethamburger]=useState(false)
  const [cartItemsFromFirebase,setcartItemsFromFirebase]=useState(0)
  //subscribing to the store
  const cartItems = useSelector((store)=>{return store.cart.myitems.length})
  // const getCartCount =async ()=>{
  //   const coll = collection(db, "users");
  // const snapshot = await getCountFromServer(coll);
  // console.log("Number of documents:", snapshot.data().count);
  // }
useEffect(()=>{if(cartItems===0)setcartItemsFromFirebase(0),[cartItems]})
  const getCartCount =async()=>{
    const docRef = doc(db,auth.currentUser?.uid+"cart",auth.currentUser?.uid+"cartItems")
    const document =await getDoc(docRef)
    if (document.exists()) {
      // console.log("Cart Data:", document.data().cartItems);
      setcartItemsFromFirebase(document.data().cartItems);
      console.log(document.data().cartItems)

    }
  }
  useEffect(()=>{onAuthStateChanged(auth,(user)=>{if(user){setaccount(true);getCartCount()}else{setaccount(false);dispatch(addItem({length:0}))}})},[])
    
    // const getAllData = async()=>{

    //   const querySnapshot = await getDocs(collection(db, "users"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // }
   
    return (
      <div className="w-full overflow-x-hidden">
        <nav className="bar">
          <div className="navparent px-4 md:px-16 lg:px-32  sm:py-4 flex items-center shadow-md justify-between flex-wrap">
            <Link className="py-1 sm:py-0" onClick={()=>{hamburger&&sethamburger(!hamburger)}} to={"/"}><AdidasLogo/></Link>
  
            <div className="navchildcontainer relative hidden sm:flex  sm:gap-6 md:gap-10 lg:gap-20">
              <div className="navchild1"><Link className="home" to="/">Home</Link></div>
              <div className="navchild2"><Link to="/about">About</Link></div>
              {/* <div className="navchild6">online Status: {useOnline()?'true':"false"}</div> */}
              <div className="navchild8"><Link to ="/cart">cart-Items ({cartItems||cartItemsFromFirebase})</Link></div>
              
            </div>
              <div onClick={()=>{sethamburger(!hamburger)}} className="sm:hidden text-3xl  leading-tight ">{hamburger?"\u2715":"\u2630"}
              </div>
               {hamburger&& <div className=" sm:hidden w-full shrink-0 bg-white flex flex-col gap-y-3 mt-3   ">
                <div onClick={()=>sethamburger(!hamburger)} className="navchild1 border-b"><Link className="home font-medium" to="/">Home</Link></div>
              <div onClick={()=>sethamburger(!hamburger)} className="navchild2 border-b"><Link  className="about font-medium" to="/about">About</Link></div>
              {/* <div className="navchild6">online Status: {useOnline()?'true':"false"}</div> */}
              
                </div>}
              
            {<div className={`${hamburger?"":"hidden"} flex flex-col sm:flex-row sm:flex gap-y-3  mt-3 sm:mt-0 sm:gap-2  sm:items-center`}>
              {account&&<User/>}
              {!account&&<button onClick={()=>{navigate('./signin');hamburger&&sethamburger(!hamburger)}} className="bg-black  text-white rounded py-1 mt-3 mb-3 sm:mb-0 sm:mt-0 px-3">Sign In </button>}
              {account&&<button onClick={()=>{signOut(auth).then(()=>console.log("signedOut"));hamburger&&sethamburger(!hamburger)}} className="border  border-black mb-3 sm:mb-0  rounded py-1 px-3">Sign Out</button>}
            </div>}
          </div>
        </nav>
       {path.pathname==="/"&&<div className="relative"> <img src={img3} alt="lebron-nike" className=" relative sliderimg w-full h-60 sm:h-72 md:h-80 lg:h-fit scale-x-[2.15] sm:scale-x-[1.3] md:scale-x-[1.5] lg:scale-x-[1]" /> <div  className="navchild8   sm:hidden p-2  border border-black font-semibold absolute top-full mt-3 left-0 z-10 "><Link className=" flex  flex-wrap" to ="/cart">cart-Items ({cartItems||cartItemsFromFirebase})</Link></div></div>}
        <Outlet/>
      </div>
    );
  };

  export default NavComponent;