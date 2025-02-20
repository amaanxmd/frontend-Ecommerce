let genderActive;
let brandActive;
let genderCategory;
let brandCategory;
export function filter(type,index,originalData){


if(type==="G"){
    this.current[index]?this.current[index]=false:this.current[index]=true;
    genderCategory=this.current
    genderActive =this.current.reduce((acc,data)=>acc+data,0)
   return filterGender.call(originalData,brandActive,this.current,brandCategory)
}else if(type==="B"){
    this.current[index]?this.current[index]=false:this.current[index]=true;
    brandCategory=this.current
    brandActive =this.current.reduce((acc,data)=>acc+data,0)
    return filterBrand.call(originalData,genderActive,this.current,genderCategory)
}
}

function filterBrand(genderActive,brandCategory,genderCategory){
    const[pr,sp,og,ter]=brandCategory
    if(!pr&&!sp&&!og&&!ter){return genderActive?filterGender.call(this,false,genderCategory):this}
    const filteredByBrand = this.filter((data)=>{ return (pr&&data.attribute_list.brand==="Performance")||(sp&&data.attribute_list.brand==="Sportswear")||(og&&data.attribute_list.brand==="Originals")||(ter&&data.attribute_list.brand==="TERREX")})
    return genderActive?filterGender.call(filteredByBrand,false,genderCategory):filteredByBrand
 }

 function filterGender(brandActive,genderCategory,brandCategory){
    const[Men,Women,Unisex]=genderCategory
  if(!Men&&!Women&&!Unisex){return brandActive?filterBrand.call(this,false,brandCategory):this}
 const filteredByGender=this.filter((data)=>(Men&&data.attribute_list.gender==="M")||(Women&&data.attribute_list.gender==="W")||(Unisex&&data.attribute_list.gender==="U"))
return brandActive?filterBrand.call(filteredByGender,false,brandCategory):filteredByGender
 }