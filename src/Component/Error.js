
import { useRouteError } from "react-router-dom"
export const Error =()=>{
const err = useRouteError()
    return (<div>
        
        <h1>An Error Has Occurred</h1>
        <p>{err.status}:{err.statusText}</p>
    
    
    
    
    </div>)
}

export default Error;