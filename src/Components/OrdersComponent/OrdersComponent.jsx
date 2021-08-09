import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { Loader } from '../../utils/Loader/Loader'
import './OrdersComponent.css' 

export const OrdersComponent = () => {

    const context = useContext(CartContext)
    const [order, setOrder] = useState([])

    useEffect(() => {
        setOrder(context.order)
     }, [context])

    return(
        <div>
            {order.length===0? <Loader/> :
            <div className="order">
                <div className="order__data">DATOS DE LA COMPRA</div>  
                <hr className="order__hr"/>              
                <div className="order__thank--name"> <span className="data__b">{order[order.length-1].compra.buyer.name}:</span> </div>
                <div className="order__thank"> Gracias por realizar la compra en SOLO REMERAS</div>
                <div className="order__thank">  Se envió la factura al mail: <span className="data__b">{order[order.length-1].compra.buyer.email}</span> </div>
                <div className="order__thank">  Su número de seguimiento es: <span className="data__b">{order[order.length-1].id}</span> </div>
                <div className="order__thank">  Espero que su compra haya sido satisfactoria, lo esperamos de vuelta. </div>
            </div>
            }    
        </div>
    )
}