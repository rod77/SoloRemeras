import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ItemDetailComponent } from "../../Components/ItemDetailComponent/ItemDetailComponent"
import { CartContext } from "../../Context/CartContext"
import { Loader } from "../../utils/Loader/Loader"
import { NotFound } from "../../utils/NotFound/NotFound"
import "./ItemDetailContainer.css"

export const ItemDetailContainer = () => {
    const context = useContext(CartContext)
    const [product,setProduct] = useState()
    const [productInex,setProductInex] = useState(0)
    
    
    const {idProducto} = useParams()
    
    useEffect(() => {
   
        if(!context.items.some(element => element.id === idProducto)){
            setProductInex(1)
        }

        setProduct(context.items.find(item => item.id === idProducto))

       
    
    }, [idProducto,context])

    return(
        <div>               
             {productInex===0&&product===undefined?<Loader/>:productInex===1?<NotFound/>:<ItemDetailComponent idProducto={product.id} title={product.title} price={product.price} imgA={product.imgA} imgB={product.imgB} description={product.description} category={product.category} stock={product.stock}/> } 
            
           
    
            
        </div>
    )

}