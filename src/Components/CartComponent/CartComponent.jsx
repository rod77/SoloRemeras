import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import './CartComponent.css'

export const CartComponent = () =>{
 const context = useContext(CartContext)
 const [productos, setProductos] = useState(context.cart)
 const [canTotal, setCantTotal] = useState(context.cantTotal)
 const [priceTotal, setPriceTotal] = useState(context.priceTotal)
 const [up, setUp] = useState(0)

 useEffect(() => {
    setProductos(context.cart)
    setCantTotal(context.cantTotal)
    setPriceTotal(context.priceTotal)    
 }, [context,up])

 const eliminarProd = (id) => {
 
    context.deleteProdCart(id);
    setUp(1)
 }

 const onAdd=(q,id,quantity)=>{
    let stock=context.stockAvailable(id)
    if(q<0 && quantity>1){
        context.updateProdCart(id,q)
        setUp(1)
    }
    if(q>0&&stock>0){
        context.updateProdCart(id,q)
        setUp(1)
    }
    
}

const vaciarCarrito = () => {
  
    while(productos.length>0){
        eliminarProd(productos[0].item.id)
    }
    context.clear()
    setUp(1)
}

    return (
        <div>
        {productos.length===0?<div    className="cartEmpty">
            <h5 className="cart__title">SU CARRITO DE COMPRAS SE ENCUENTRA VACIO</h5>
            <img className="CartEmpty--img" src="/img/cartEmpty.png" alt="Carrito Vacio" />
        </div>
    :<div>
        <h5 className="cart__title">CARRITO DE COMPRAS</h5>
        <div className="cartGrilla">
                <div className="cartGrilla__closeBt"></div>
                <div className="cartGrilla__title">PRODUCTO</div>
                <div className="cartGrilla__price">PRECIO</div>
                <div className="cartGrilla__cant">CANT.</div>
                <div className="cartGrilla__cantTotal">SUBTOTAL</div>
        </div>
        <hr />
        {productos===undefined?"":               
                        productos.map(
                            (product) => {
                                return (
                                    <div className="cartGrilla__items--i" key={product.item.id}>
                                        <div className="cartGrilla__items--action">
                                            <div className="cartGrilla__items--action--flex">
                                                <button className="cartGrilla__items--closeBt" onClick={()=>eliminarProd(product.item.id)}>X</button>
                                                <img className="cartGrilla__items--img" src={product.item.imgA} alt="Imagen del producto" />
                                            </div>
                                        </div> 
                                                <div className="cartGrilla__items--P_title"> <span className="cartGrilla__items--_s">PRODUCTO:</span>{product.item.title} </div>                                                                                
                                                <div className="cartGrilla__items--P_price"><span className="cartGrilla__items--_s">PRECIO:</span> $ {product.item.price} </div>                                        
                                                <div className="cartGrilla__items--P_cant">
                                                    <span className="cartGrilla__items--_s">
                                                        CANT.:</span> 
                                                        <button onClick={()=>onAdd(-1,product.item.id,product.quantity)} className="cartGrilla__items__rest">-</button>
                                                        {product.quantity}
                                                        <button onClick={()=>onAdd(1,product.item.id,product.quantity)}className="cartGrilla__items__add">+</button> 
                                                    </div>                                                                                
                                                <div className="cartGrilla__items--P_cantTotal"> <span className="cartGrilla__items--_s">SUBTOTAL:</span> $ {product.item.price * product.quantity}</div>
                                                <div>
                                                <hr className="cartGrilla__items--line_s"/>
                                                </div>
                                    </div>

                                );
                            }
                        )           
                    }  
        <hr className="cartResumen--line_s"/>
        <div className="cartResumen--flex">
            <div className="cartResumen">
                <div className="cartResumen__title">RESUMEN DE COMPRA</div>
                <div className="cartResumen__cant">CANTIDAD DE UNIDADES: {canTotal}</div>
                <div className="cartResumen__total">TOTAL: $ {priceTotal}</div>
                <NavLink to={`/checkout`} className="cart__link">
                    <button className="cartResumen__finCompra">INICIAR PAGO</button>
                </NavLink><br />
                <button onClick={()=>vaciarCarrito()} className="cartResumen__vaciarCarrito">VACIAR CARRITO</button>
            </div>
        </div>
            
 

    </div>}
    </div>)
}