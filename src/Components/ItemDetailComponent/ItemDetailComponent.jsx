import { useContext, useEffect, useState } from "react"
import { ItemCountComponent } from "../ItemCountComponent/ItemCountComponent"
import { CartContext } from "../../Context/CartContext"
import "./ItemDetailComponent.css"

export const ItemDetailComponent = ({idProducto,title,price,imgA,imgB,description,category,stock}) => {
    const context = useContext(CartContext)
const [talle, setTalle]= useState()
const [img, setImg]= useState(imgA)
const [imgSel, setImgSel]= useState("A")
const [adv__talle, setAdv__talle]= useState(0)
const [adv__addCart, setAdv__addCart]= useState(0)
const [updateStock, setUpdateStock]= useState(0)
const [product,setProduct] = useState()

useEffect(() => {   
    
    setProduct(context.items.find(item => item.id === idProducto))
    setUpdateStock(1)  
}, [updateStock,context,idProducto])

const selectBt = (seleccion)=>{
    setAdv__talle(0)
    setTalle(seleccion)
}

const selectImg = (seleccion,pos)=>{
    setImg(seleccion)
    setImgSel(pos)
}

const onAdd=(quantity)=>{
    if(talle===undefined)
        {setAdv__talle(1)}
    else{              
        context.updateStock(idProducto,quantity)  
        context.addCart(idProducto,quantity)  
        setUpdateStock(0)
        setAdv__addCart(quantity)
    }
}

    return(
        <div>
            <div className="detail">
                <div className="detail__fotosPrev">
                    <div className="detail__fotosPrev--flex">
                        <img onClick={()=>selectImg(imgA,"A")} className={imgSel==="A"?"detail__fotosPrev--item--Sel":"detail__fotosPrev--item"} src={imgA} alt="" />
                        <img onClick={()=>selectImg(imgB,"B")} className={imgSel==="B"?"detail__fotosPrev--item--Sel":"detail__fotosPrev--item"} src={imgB} alt="" />
                    </div>
                </div>
                <div className="detail__fotosPrincipal">
                    <img className="detail__fotosPrincipal--img" src={img} alt="" />
                </div>
                <div className="detail__detalles">
                    <div className="detail__detalles--flex">
                        <p className="detail__detalles--category">{category}</p>
                        <h2 className="detail__detalles--title">{title}</h2>
                        <p className="detail__detalles--price">${price}</p> 
                        { updateStock===0?"":product.stock===0?"":
                        <div className="detail__detalles--talle"> 
                                <p className="detail__detalles--talle--title">TALLE:</p>
                                <div className="detail__detalles--talle--option">
                                    <button onClick={()=>selectBt("S")} className={talle==="S"?"bt__circle--Sel":"bt__circle"}>S</button>
                                    <button onClick={()=>selectBt("M")} className={talle==="M"?"bt__circle--Sel":"bt__circle"}>M</button>
                                    <button onClick={()=>selectBt("L")} className={talle==="L"?"bt__circle--Sel":"bt__circle"}>L</button>
                                    <span className={adv__talle===1?"adv__talle":"adv--off"}> Seleccione talle</span>
                                </div>
                                
                            
                        </div>  }
                        <div className="detail__detalles--count">{updateStock===0?"":<ItemCountComponent stock={product.stock} onAdd={onAdd}/>} </div>         
                        <span className={updateStock===0?"":adv__addCart===1?"adv__addCart":"adv--off"}>Se agrego 1 unidad al carrito</span>                 
                        <span className={updateStock===0?"":adv__addCart>1?"adv__addCart":"adv--off"}>Se agregaron {adv__addCart} unidades al carrito</span>                 
                    </div>             
                </div>
            </div>
            <div className="detail__description">
                <p className="detail__description--title">DETALLES</p>
                <p className="detail__description--desc">{description}</p>
            </div>
            
        </div>
    )

}
