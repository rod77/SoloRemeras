import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './ItemComponent.css'


export const ItemComponent = ({idProducto,title,price,imgA,imgB,description,category}) => {
    
    const [img,setImg] = useState(imgA)
    
    
    const changeImg = (a) => {
        a===1?setImg(imgB):setImg(imgA)        
    }
    

    return(
        <NavLink to={`/item/${idProducto}`} className="item__link">
        <div className="item" onMouseOver={()=>changeImg(1)} onMouseOut={()=>changeImg(0)}>
            <div  className="item__img">
            <img src={img} alt="" className="item__img--imgA"/>               
            </div>
            <div className="item__category">
                <h5>{category}</h5>
            </div>
            <div className="item__title">
                <p >{title}</p>
            </div>
            <div className="item__price">
                <p >${price}</p>
            </div>
        </div>
        </NavLink>
    )
}