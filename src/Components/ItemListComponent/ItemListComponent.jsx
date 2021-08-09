import './ItemListComponent.css' 
import {ItemComponent} from '../ItemComponent/ItemComponent'
 
export const ItemListComponent = ({productos}) => {
      
    return(
        <div className="list__items">
            {productos.map(product => <ItemComponent key={product.id}idProducto={product.id} title={product.title} price={product.price} imgA={product.imgA} imgB={product.imgB} description={product.description} category={product.category}/>)}           
        </div>
    )
}