import { UserContext } from "../utils/userContext"
const Contact = ()=>{


    return (<div>
    
       <h1>Hello Here You can contact Me </h1>
       <UserContext.Consumer>{({user})=>(<h1>{user}</h1>)}</UserContext.Consumer>

    </div>)
}

export default Contact;