import React from "react"
import { DefaultUser } from "./LogoSvgs"
import {useState} from "react"
import { auth,db } from "../utils/firebase"
import { updateProfile } from "firebase/auth"
import { collection,addDoc } from "firebase/firestore"
// import { UserContext } from "../utils/userContext"

const User =()=>{
    const [showdetails,setshowdetails]=useState(false)
    const [name,setname]=useState(null)
    function update(name){
        updateProfile(auth.currentUser,{
            displayName:name
        }).then(()=>{setname(null)})
    }
    async function sendProfilePic(e){
        try {
            const docRef = await addDoc(collection(db, "profile_pics"), {
              dp:e.target.value
              
            });
            console.log(e.target.value)
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          
    }
    return <div onClick={(e)=>{setshowdetails(!showdetails)}} className="relative ">
         <DefaultUser/>
         {<div className={`fixed flex justify-center items-center flex-col -top-full ${showdetails&&"translate-y-full"} transition-transform duration-500 ease-in-out left-0 z-20 p-2 bg-black/50 w-full  h-screen`}>
            <div onClick={(e)=>e.stopPropagation()} className="bg-white border flex flex-col flex-wrap gap-y-3 items-center  border-black p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/4 ">
              <div className="flex flex-col flex-wrap gap-y-3">

                <div className="flex flex-wrap  gap-2    justify-start ">
                <span>Name:</span>
                <span>{auth.currentUser?.displayName||<div className="relative after:bg-black after:h-[1px] after:w-full after:absolute after:left-0 after:bottom-0 "><input onChange={(e)=>setname(e.target.value)} className=" focus:outline-none bg-transparent" type='text'/></div>}</span>
            </div>
            <div className="flex  gap-2  flex-wrap justify-start ">
                <span>Email:</span>
                <span className="">{auth.currentUser?.email}</span>
            </div>
              </div>
          {/* <div className="bg-red-500 relative"> <input className="" onChange={(e)=>sendProfilePic(e)} type="file"></input></div> */}
            {!auth.currentUser?.displayName&&<button onClick={()=>{if(name)update(name)}} className={` ${name?"bg-gray-700 after:border-gray-700":"bg-black  after:border-black"}   relative  bg-black  text-white px-3 pb-4  pt-3 font-semibold text-sm tracking-widest after:h-full after:w-full after:border after:absolute after:top-1 after:left-1`}>Update Name &#8594;</button>}
            </div>
            
            </div>}
    </div>
}

export default User
// class User extends React.Component{

//     constructor(props){
//         super(props)

//         this.state={
//           name:'username',
//           count:7,

//         }
//     }
//     componentDidMount(){
//         fetch("https://api.github.com/users/amaanxmd").then((data)=>{return data.json()}).then((data)=>{this.setState({name:data.login})})
        
//     }

//     render(){
        
//         const {name}=this.props
//         return(<div className="userWrapper">

//             <img src="https://avatars.githubusercontent.com/u/160055553?v=4" alt="myphoto" className="usePhoto"/>
//             <h1>{this.state.name}</h1>
//             <h2>Location -India</h2>
//             <p>As a recent graduate with a degree in Computer Science, I am excited to launch my career in software development. Throughout my studies, I gained hands-on experience in programming languages such as C, C++, and Java, as well as web development technologies like HTML, CSS, and JavaScript. I have also developed skills in modern frameworks like React and Redux, enabling me to build dynamic, scalable, and user-friendly applications.

// I'm a fast learner with a passion for problem-solving, and I thrive in collaborative environments where I can contribute to innovative software solutions. I am eager to apply my skills, learn new technologies, and make an immediate impact on your team. Let's connect to explore how I can add value to your projects.</p>
//             <UserContext.Consumer>{({user})=>(<h1>{user}</h1>)}</UserContext.Consumer>
//             <UserContext.Provider value={{user:"amaan"}}><UserContext.Consumer>{({user})=>(<h1>{user}</h1>)}</UserContext.Consumer></UserContext.Provider>
//             <p>{this.state.count}</p>
//             <button onClick={()=>{this.setState({ count:this.state.count+1})}}>click me</button>
//             </div>)
        
//     }
// }