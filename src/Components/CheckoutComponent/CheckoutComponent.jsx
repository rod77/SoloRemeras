import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../Context/CartContext'
import { getFirestore } from '../../firebase'
import firebase from "firebase/app";
import './CheckoutComponent.css'
import { NavLink } from 'react-router-dom';



export const CheckoutComponent = () => {
    const context = useContext(CartContext)
    const [buyerAux, setBuyerAux] = useState({ name: '', phone: '', email: '' , email2:''});
    const [buyer, setBuyer] = useState({ name: '', phone: '', email: ''});
    const [productos, setProductos] = useState(context.cart)
    const [adv__name, setAdv__name]= useState(0)
    const [adv__phone, setAdv__phone]= useState(0)
    const [adv__email, setAdv__email]= useState(0)
    const [validacionesOk, setValidacionesOk]= useState(0)
    
    useEffect(() => {
       setProductos(context.cart)
    }, [context])

const handleInputChange = (e) => {
    setBuyerAux({
        ...buyerAux,
        [e.target.name]: e.target.value
    })
}

const validaciones = () =>{
    setValidacionesOk(1)
    if(buyerAux.name.trim()===""){
            setAdv__name(1)
            setValidacionesOk(0)
        }else{
            setAdv__name(0)
        }
    if(buyerAux.phone.trim()===""){
        setAdv__phone(1) 
        setValidacionesOk(0)
    }else{
        setAdv__phone(0)
    }
    if(buyerAux.email.trim()==="" && buyerAux.email2.trim()===""){
        setAdv__email(3)
        setValidacionesOk(0)
    }else if(buyerAux.email.trim()===""){
        setAdv__email(1)
        setValidacionesOk(0)
    }else if(buyerAux.email2.trim()===""){
        setAdv__email(2)
        setValidacionesOk(0)
    }else if(buyerAux.email!==buyerAux.email2){
        setAdv__email(4)
        setValidacionesOk(0)
    }else if(!buyerAux.email.includes('@')){
        setAdv__email(5)
        setValidacionesOk(0)}
    else{   setAdv__email(0)
    }
    setBuyer({name:buyerAux.name,phone:buyerAux.phone,email:buyerAux.email })
    
}


const cancel = () =>{
    setValidacionesOk(0)
}

const pay = (e) => {
  
     const db = getFirestore();
     const comprasCollection = db.collection('compras');//seteo coleccion

    //Creamos objeto con los items comprados
    let items = context.cart.map(
        (obj) => {
            return {
                id: obj.item.id,
                title: obj.item.title,
                quantity: obj.quantity,
                price: obj.item.price,
            };
        })

    //Creo objeto con lo que vamos a grabar
    const nuevaCompra = {
        buyer: buyer,
        items: items,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        total: context.priceTotal
    }

    //grabamos en firebase    
     comprasCollection.add(nuevaCompra).then(({id})=>{

        context.addOrder(id,nuevaCompra) 
     }).catch(err=>{console.log(err)})
     .finally(()=>{console.log("finally")})
}
 
    return(
        <div className ="checkout">
            <div className="checkout__title">COMPLETE Y VERIFIQUE LOS DATOS PARA FINALIZAR LA COMPRA</div>
            <hr /> 
            <div className="checkout__items--title">DATOS PERSONALES:</div>
            <div className="checkout__form">
                <label htmlFor="name" className="checkout__form--T">NOMBRE</label><br />
                <input type="text" name="name" onChange={handleInputChange}  id="name" placeholder=" " className={validacionesOk===0?"checkout__form--F":"checkout__form--F--off"}/>
                <span className={adv__name===1?"adv--on":"adv--off"}> Falta completar campo</span>
                <br />
                <label htmlFor="phone" className="checkout__form--T">TELEFONO</label><br />
                <input type="number" name="phone" onChange={handleInputChange}  id="phone" placeholder=" " className={validacionesOk===0?"checkout__form--F":"checkout__form--F--off"} /> 
                <span className={adv__phone===1?"adv--on":"adv--off"}> Falta completar campo</span>
                <br />                               
                <label htmlFor="email" className="checkout__form--T">EMAIL</label><br />
                <input type="email" name="email" onChange={handleInputChange} id="email" placeholder=" " className={validacionesOk===0?"checkout__form--F":"checkout__form--F--off"}/>
                <span className={adv__email===1||adv__email===3?"adv--on":"adv--off"}> Falta completar campo</span>
                <span className={adv__email===5?"adv--on":"adv--off"}> Formato de Email Incorrecto</span>
                <br />
                <label htmlFor="email2" className="checkout__form--T">REPITA SU EMAIL</label><br />
                <input type="email" name="email2" onChange={handleInputChange} id="email2" placeholder=" " className={validacionesOk===0?"checkout__form--F":"checkout__form--F--off"}/>
                <span className={adv__email===2||adv__email===3?"adv--on":"adv--off"}> Falta completar campo</span>
                <span className={adv__email===4?"adv--on":"adv--off"}> Los Emails no coinciden</span>
                <br />
                
                
            </div>
            <div className="checkout__items--title">ITEMS:</div>
            <div className="checkout__items">
                    <div className="checkout__items--head">
                            <div className="checkout__items--product">PRODUCTO</div>
                            <div className="checkout__items--price">PRECIO</div>
                            <div className="checkout__items--cant">CANTIDAD</div>
                            <div className="checkout__items--cantTotal">SUBTOTAL</div>
                     </div>
                    {productos===undefined?"":               
                        productos.map(
                            (product) => {
                                return (
                                    <div className="checkout__items--i" key={product.item.id}>
                                        
                                        <div className="checkout__items--P_product"> <span className="checkout__items--_s">PRODUCTO:</span> -{product.item.title} </div>                                        
                                        <div className="checkout__items--P_price"><span className="checkout__items--_s">PRECIO:</span> $ {product.item.price} </div>                                        
                                        <div className="checkout__items--P_cant"><span className="checkout__items--_s">CANTIDAD:</span> {product.quantity}</div>                                                                                
                                        <div className="checkout__items--P_cantTotal"> <span className="checkout__items--_s">SUBTOTAL:</span> $ {product.item.price * product.quantity}</div>
                                        <hr className="checkout__items--line_s"/>
                                    </div>

                                );
                            }
                        )           
                    }  
            </div>
            <div className="checkout__items--title">TOTAL:</div>
            <div className="checkout__total">
                    $ {context.priceTotal} .-
            </div>
                <button onClick={validaciones} className={validacionesOk===0?"checkout__pagar--bt":"adv--off"}>PAGAR</button>
            
            <div className={validacionesOk===0?"adv--off":"chekout__pagar--question"}>
                <hr className="checkout__pagar--line_s"/>
                    <div className="checkout__pagar--title">¿Los Datos son Correctos?</div>
                <NavLink to={`/order`} className="nav__link">
                    <button onClick={pay} className="chekout__pagar--si">SI</button>
                </NavLink>
                    <button onClick={cancel} className="chekout__pagar--no">NO</button>
            </div>
 
        </div>
    )
}