import { useEffect, useState } from "react"

export const useOnline =()=>{
    
const[online,setonline]=useState(true)


useEffect(()=>{
    
window.addEventListener("online",()=>{setonline(true)})

window.addEventListener("offline",()=>{setonline(false)})

},[])
return online

}