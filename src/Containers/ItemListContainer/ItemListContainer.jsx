import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { ItemListComponent } from '../../Components/ItemListComponent/ItemListComponent';
import './ItemListContainer.css'
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react'; 
import { Loader } from '../../utils/Loader/Loader';

export const ItemListContainer = () => {
    const context = useContext(CartContext); 
    let [title, setTitle] = useState("Productos");
    let [items, setItems] = useState(context.items); 

    const { category } = useParams();
 

    
     useEffect(() => { 
          category===undefined?setItems(context.items):setItems(context.items.filter(item=>item.category===category))
          category===undefined?setTitle("Todo"):setTitle(category)
        

     }, [category,context]);
  
    return(
        <div> 
            <p className="title__products">{title}</p>  
            {items===undefined? <Loader/> :<ItemListComponent productos={items}/>}
        </div>
    )
}