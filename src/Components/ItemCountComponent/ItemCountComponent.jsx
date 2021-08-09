import { useState } from 'react'
import './ItemCountComponent.css'

export const ItemCountComponent = ({stock,onAdd}) =>{
    const[cant, setCant] = useState(1)
 
    const updateCount = (quantity) => {        
        let total = cant + quantity;
        (total<1 || total>stock)?setCant(cant):setCant(total)
        
    }

    return(
        <div className="itemCount">
            {stock===0?"":
            <div className="itemCount__action">
                <button onClick={()=>updateCount(-1)} className="itemCount__rest">-</button>
                <p className="itemCount__result">{cant}</p>
                <button onClick={()=>updateCount(1)}className="itemCount__add">+</button>            
            </div>}
            {stock===0?
            <button className="bt__cart--inv" disabled="disabled">SIN STOCK</button>  
            :
            <button className="bt__cart" onClick={()=>onAdd(cant)}>AGREGAR AL CARRITO</button>  
            }
        </div>
        
    )
}