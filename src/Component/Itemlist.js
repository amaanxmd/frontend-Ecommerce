export const ItemList =({title,text,rating,userNickname,date})=>{


return (
  <div className="itemListWrapper">
    
    <div className="nameandStars">
      <div className="rating">{rating}</div>
      <h4>{userNickname}</h4>
    </div>
    
   
    <div className="TitleandText">
      <div className="titleandDate"><h3 className="title">{title}</h3>
      <div>{date}</div></div>
      
      <div>{text}</div>
    </div>
  </div>
  
);


}