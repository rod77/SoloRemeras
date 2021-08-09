import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import './CartWidgetComponent.css'

export const CartWidgetComponent = () =>{
    const context = useContext(CartContext)

    return(
        <>
            <NavLink to={`/cart`} className="cart__link">
            <div  className="cart__bt"> 
                <div  className="cart__bt--flex"> 
            
                    <img className="cart__img" src="/img/cartt.png" alt="Logo Cart" /> 
                    <p className="cart__text">   <span className="cart__text--_s">Mi Compra</span> <span className={context.cart.length===0?"cart_total--off":"cart_total--on"}>({context.cantTotal})</span>
                    </p>
                </div>          
            </div>          
            </NavLink>
        </>
    )
}
