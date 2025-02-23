import {lazy, Suspense} from "react";
import { createBrowserRouter,RouterProvider,} from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import NavComponent from "./Component/NavComponent";
import Body from "./Component/Body";
import  Cart  from "./Component/Cart";
import About  from "./Component/About";
import Contact from "./Component/Contact";
import ProductDetails  from "./Component/ProductDetails";
import Error from "./Component/Error"
import 'dotenv/config'
import SignIn from "./Component/SignIn";
import Footer from "./Component/Footer";


const Lazy = lazy(()=>{return import("./Component/lazyloading")})

const App = () => {
  const router =createBrowserRouter([
    {
      path:"/",
      element :<NavComponent />,
      children:[{
    
        path:"/about",
        element :<About />
      },
      {
        path:"signin",
        element:<SignIn/>
      },
      
    {
    
      path:"/",
      element:<Body />
    },
    
    {path:"/contact",
      element:<Contact></Contact>
    },
    {path:"/:id",
      element:<ProductDetails />
    },
   
    {path:"/lazyloading",
      element:<Suspense  fallback={<div>loading</div>}><Lazy/></Suspense>
    
    },
    {
      path:"/cart",
      element:<Cart/>
    }
    
    ],
      errorElement:<Error />
    },
    
    
    ])
  return (
    <Provider store={appStore}><RouterProvider router= {router} /></Provider>
    
    
    
  );
};

export default App;




