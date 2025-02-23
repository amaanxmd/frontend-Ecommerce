import React from 'react'
import { CheckMark, GreenCheckMark, RedCross } from './LogoSvgs'
import { useState } from 'react'
import { validatePassword ,createUserWithEmailAndPassword,fetchSignInMethodsForEmail,signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom'
const SignIn = () => {
    // const [goBackToSignInSignUp,setgoBackToSignInSignUp]=useState({type:"nothing"})
    const [email,setemail]=useState(null)
    const [password,setpassword]=useState(null)
    const [validated,setvalidated]=useState(false)
    const [error,seterror]=useState(null)
    const navigate =useNavigate()
    function validateEmail(email){
        const result = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        if(result){
            seterror(null)
            fetchSignInMethodsForEmail(auth,email)
            .then((result)=>{result.length>0?setvalidated({user:"exist"}):setvalidated({user:"new"})})
            .catch((error)=>{console.log(error)})
            
        }
        else{
            seterror({errortype:"email"})
        }
    }
    async function checkPassword(password){
      try{const result = await validatePassword(auth,password)
        if(result.isValid){
        
           seterror(null)
            if(validated.user==="new"){
                try{

                    const loginDetails= await createUserWithEmailAndPassword(auth,email,password)
                    navigate('/')
                }catch(e){seterror({error:e})}
            
           }else{
            try{

                const loginDetails =await signInWithEmailAndPassword(auth,email,password)
                navigate('/')
            }catch(e){seterror({error:e});}
           }
            // console.log(loginDetails)
            
           
        } else{
            seterror({result})
        }

            
        }
      
      catch(e){
        console.error(e)
      }
      
    }
  return (
    <div className=" px-3 lg:px-32 pt-4">
        <div className="flex flex-col sm:flex-row gap-y-10 gap-x-14 w-full  ">
        <div className="flex pb-4 sm:pb-16 order-2 sm:order-1 flex-col gap-y-2 items-start w-full">
            <img src="https://www.adidas.co.in/glass/react/557321e/assets/img/account-portal-page-inline.png" alt="Adidas Page About Us"/>
            <h1 className="font-bold text-4xl">JOIN THE CLUB. GET<br></br> REWARDED.</h1>
            <span className="my-1">JOIN ADICLUB. GET REWARDED TODAY.</span>
            <ul className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2"><CheckMark/><li >Free delivery</li></div>
                <div className="flex items-center gap-x-2"><CheckMark/><li >Special offers and promotions</li></div>
                <div className="flex items-center gap-x-2"><CheckMark/><li >Access to Members Only products and sales</li></div>
                <div className="flex items-center gap-x-2"><CheckMark/><li >Access to adidas Running</li></div>
                <div className="flex items-center gap-x-2"><CheckMark/><li >Special offers and promotions</li></div>
                <p className="mt-1 ">Join now to start earning points, reach new levels and unlock more rewards and <br></br> benefits from adiClub.</p>
            </ul>
        </div>
        <form onClick={(e)=>e.preventDefault()} className="flex order-1 sm:order-2 flex-col gap-y-5 items-start w-full relative">
            <img src="https://account-frontends.adidas.com/_astro/adiclub-blue-desktop.CG118tV1.svg"/>
            <h1 className="font-bold text-3xl">{validated?.user==="exist"?"LOGIN TO ADICLUB":validated?.user==="new"?"WELCOME TO ADICLUB!":'YOUR ADICLUB BENEFITS AWAIT'}</h1>
            <p className="text-sm">{validated?.user==="new"?'Create a password to have full access to adiClub benefits and be able to redeem points, save your shipping details and more.':'Get free shipping, discount vouchers and members only products when you’re in adiClub.'}</p>
            {!validated&&<h6 className="font-bold text-lg">Log in or sign up (it’s free)</h6>}
            <div className={`w-full relative  after:absolute after:top-1/2 after:-translate-y-1/2 after:bg-white after:left-1 hover:after:-translate-y-8 hover:after:text-xs    `}><input key={validated} onChange={(e)=>validated?setpassword(e.target.value):setemail(e.target.value)} className="border w-full py-3 px-2 border-black" type={validated?"password":"email"}/>{error&&<div className='text-red-600 text-xs '>{error.errortype==="email"?"Please enter a valid email address":error.error?.toString()}</div>}</div>
            {validated?.user==="new"&&<p className='text-gray-400'>Minimum 8 characters with at least one uppercase, one lowercase, one special character and a number.</p>}
            <div className='flex justify-between w-full'>
                <button onClick={()=>{validated?checkPassword(password):validateEmail(email)}} className="relative bg-black -mt-2 text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:border-black after:absolute after:top-1 after:left-1 ">{validated?.user==="new"?"CREATE PASSWORD ":validated?.user==="exist"?"SIGN IN":"CONTINUE "}&#8594;</button>
                {validated.user&&<button onClick={()=>{setvalidated(false);seterror(null)}} className="relative text-sm font-semibold -mt-8 ">{validated?.user==="new"?"SIGN IN INSTEAD":"CREATE AN ACCOUNT"}</button>}
                </div>
                
            {error?.result&&<div className=' w-full gap-y-1  flex flex-col justify-start border-gray-300'>
                
                <div className='flex items-center gap-x-1'>
                    <span className='text-xs mb-0.5 '>Contains Lowercase Letter</span>{error.result.containsLowercaseLetter?<GreenCheckMark/>:<RedCross/>}
                </div>
                <div className='flex items-center gap-x-1'>
                    <span className='text-xs mb-0.5'>Contains Uppercase Letter</span>{error.result.containsUppercaseLetter?<GreenCheckMark/>:<RedCross/>}
                </div>
                <div className='flex items-center gap-x-1'>
                    <span className='text-xs mb-0.5'>Contains Special Character</span>{error.result.containsNonAlphanumericCharacter?<GreenCheckMark/>:<RedCross/>}
                </div>
                <div className='flex items-center gap-x-1'>
                    <span className='text-xs mb-0.5'>Contains Numeric Character</span>{error.result.containsNumericCharacter?<GreenCheckMark/>:<RedCross/>}
                </div>
                <div className='flex items-center gap-x-1'>
                    <span className='text-xs mb-0.5'>Minimum Password Length</span>{error.result.meetsMinPasswordLength?<GreenCheckMark/>:<RedCross/>}
                </div>

                
                
                </div>}
        </form>
    </div>
    </div>
  )
}
// ${validated?'after:content-["Password_*"]':'after:content-["EMAIL_ADDRESS_or_PHONE_NUMBER_*"]'}

export default SignIn