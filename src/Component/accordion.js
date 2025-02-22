import { useState  } from "react";
import { ItemList } from "./Itemlist"
import Reviews from "./Reviews";

export const Accordion = ({currentCardData})=>{

  const [accorOpen,setaccorOpen] =useState(Array(4).fill(0))
  
  // const handleclick=()=>{

    
    
  // }
 
  return (
    <div className="reviewcontainer  px-4  sm:mt-24 mt-6 ">
      
      <Reviews model_number={currentCardData.model_number} accorOpen={accorOpen} setaccorOpen ={setaccorOpen}/>
      <div className="border-b-2 py-8">
        <div className="flex justify-between items-center">
      <p className="font-bold ">Description</p>
      <p  className={ `${accorOpen[1]?"-rotate-90":"rotate-90"} text-5xl text-center pb-4 `} onClick={()=>setaccorOpen([0,!accorOpen[1],0])}>&rsaquo;</p>

        </div>
        {accorOpen[1]?<div className="flex py-8 items-center gap-x-4">
          
          
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">{currentCardData.product_description.subtitle}</h2>
            <p>{currentCardData.product_description.text}</p>
          </div>
          <div className="w-1/2"><img src={currentCardData.product_description.description_assets.image_url}/></div>
        
        
        </div>:null}
      </div>
       <div className="border-b-2 py-8">
        <div className="flex justify-between items-center">
          <p className="font-bold">Details</p>
          <p  className={`text-5xl ${accorOpen[2]?"-rotate-90":"rotate-90"} pb-4`}onClick={()=>setaccorOpen([0,0,!accorOpen[2]])}>&rsaquo;</p>

        </div>
        {accorOpen[2]?<div className="mt-8">

         <div className="w-full h-full">
          <ul className="flex w-full   flex-wrap">
            <li className="w-1/2 list-disc list-inside">{currentCardData.attribute_list.productfit+" fit"}</li>
            <li className="w-1/2 list-disc list-inside">{currentCardData.attribute_list.base_material +" material"}</li>
            <li className="w-1/2 list-disc list-inside">{currentCardData.attribute_list.closure+" closure"}</li>
            <li className="w-1/2 list-disc list-inside">{"Product Type: "+currentCardData.attribute_list.productType}</li>
            <li className="w-1/2 list-disc list-inside">{"Surface: "+currentCardData.attribute_list.surface}</li>
            <li className="w-1/2 list-disc list-inside">{"Product Code: "+currentCardData.id}</li>
            <li className="w-1/2 list-disc list-inside">{"Color :"+currentCardData.attribute_list.color}</li>
          </ul>
         </div>
         <div style={{display:"table"}} className="w-full mt-8 ">
         <table className="w-full border border-black border-collapse">
  <thead>
    <tr className="bg-black text-white">
      <th className="p-4 text-center border-r w-1/2 border-white">Attribute</th>
      <th className="p-4 text-center w-1/2">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border border-black even:bg-gray-100">
      <td className="p-4 border-r border-black">Name and Address of Importer</td>
      <td className="p-4">
        {currentCardData.product_certificates.legalImporterAddress}
      </td>
    </tr>
    <tr className="border border-black even:bg-gray-100">
      <td className="p-4 border-r border-black">Net Quantity</td>
      <td className="p-4">{currentCardData.product_certificates.netQuantity}</td>
    </tr>
    <tr className="border border-black even:bg-gray-100">
      <td className="p-4 border-r border-black">Gender</td>
      <td className="p-4">{currentCardData.attribute_list.gender}</td>
    </tr>
    <tr className="border border-black even:bg-gray-100">
      <td className="p-4 border-r border-black">Country of Origin</td>
      <td className="p-4">{currentCardData.product_certificates.legalCountryofOrigin}</td>
    </tr>
  </tbody>
</table>

         </div>


        </div>:null}
       </div>

      {/* <div className="reviewWrapper" onClick={handleclick}>
        <div>Reviews &#40;{prop.reviewdata.totalResults}&#41;</div>
        <div>
          {prop.reviewdata.reviews[0].rating}
          &#9733;&#9733;&#9733;&#9733;&#9733;&#10225;
        </div>
        </div>
        {prop.collapse && prop.reviewdata.reviews.map((data) => (
          <ItemList
            key={data.id}
            title={data.title}
            text={data.text}
            userNickname={data.userNickname}
            rating={data.rating}
            date = {data.formattedDate}
          />
        ))} */}
      
    </div>
  );
}