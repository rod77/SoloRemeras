import { createContext, useState,useEffect } from 'react';
import { getFirestore } from '../firebase';

const CartContext = createContext();

function CartProvider({ defaultValue = [], children }) {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [cantTotal, setCantTotal] = useState(0);
    const [priceTotal, setPriceTotal] = useState(0);
    const [order, setOrder] = useState([]);

    const getAll = () => {
        const db = getFirestore(); //inicializo el cliente
        const itemsCollection = db.collection('items');//seteo coleccion
        itemsCollection.get().then((querySnapshot) => {
            if (querySnapshot.size === 0) {
                console.log('No results');
            }
            console.log('ObtengoDatos');
            let snapshot = querySnapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            }); 

            setItems(snapshot); 
            
        }).catch((error) => {
            console.error("Error:", error);
        });
    };
    
    
    useEffect(() => {
        getAll(); 
    }, []);
   
  const addOrder = (idOrder,compra) =>{
    
      //Compruebo si el carrito esta vacio, y despues veo si existe en el o no.
     if(order.length===0){
         setOrder([{id:idOrder,compra:compra}]) //Compra compuesto por Buyer y Items
     }else{
         setOrder([...order,{id:idOrder,compra:compra}])
     }
     clear()
  }
  
  //devuelve la ultima orden
  const lastOrder = () =>{
    return order[-1]
  }

   //Vacio el carrito
   const clear = () =>{
    setCart([])
    setCantTotal(0)
    setPriceTotal(0);
}

    //Actualizo el stock de los items. No del carrito
    const updateStock = (idProduct,quantity)=>
    {
        let itemsAux = items
        let pos = items.findIndex(element=>element.id===idProduct)
        itemsAux[pos].stock = itemsAux[pos].stock -quantity
        setItems(itemsAux)
    }

    //Agrego items al carrito // actualizo si ya si existia
    const addCart = (idProduct,quantity)=>
    {
        //busco item, para agregarlo a cart
        let itemAux = searchItem(idProduct)
        
        //Compruebo si el carrito esta vacio, y despues veo si existe en el o no.
        if(cart.length===0){
            setCart([{item:itemAux,quantity:quantity}])
        }else{
            isInCart(idProduct)?updateCart(idProduct,quantity):setCart([...cart,{item:itemAux,quantity:quantity}])
        }
        updateCant(quantity);
        updatePrice(quantity,itemAux.price);
    }
    
    const searchItem =(id)=>{
        return items.find(element => element.id === id);
    }

    //Verifica si Existe en el carrito, devuelve false/true
    const isInCart =(id) =>{
        return cart.some(element => element.item.id === id)
    }

    //Actualizo el cart
   const updateCart =(idProduct,quantity) =>{
        let cartAux = cart
         let pos = cart.findIndex(element=>element.item.id===idProduct)
        cartAux[pos].quantity = cartAux[pos].quantity +quantity
        setCart(cartAux)
    }

    const updateCant =(quantity)=>{
        let cantTotalAux = cantTotal
        cantTotalAux = cantTotalAux + quantity
        setCantTotal(cantTotalAux)

    }
    const updatePrice =(quantity,price)=>{
        let priceTotalAux = priceTotal
        priceTotalAux = priceTotalAux + (price*quantity)
        setPriceTotal(priceTotalAux)
    }
    const deleteProdCart =(idProduct)=>{
        let cartAux = cart
        let pos = cart.findIndex(element=>element.item.id===idProduct)
        let quantity = cartAux[pos].quantity
        let price = cartAux[pos].item.price
        updateCant(-quantity)
        updatePrice(-quantity,price)
        updateStock(idProduct,-quantity)
        cartAux.splice(pos,1)
        setCart(cartAux)
    }

    
    //Actualizo el cart
   const updateProdCart =(idProduct,quantity) =>{
    let cartAux = cart
    let pos = cart.findIndex(element=>element.item.id===idProduct)    
    let price = cartAux[pos].item.price
    updateCant(quantity)
    updatePrice(quantity,price)
    updateStock(idProduct,quantity)
    cartAux[pos].quantity = cartAux[pos].quantity +quantity
    setCart(cartAux)
}

    const stockAvailable=(idProduct)=>{
        let pos = items.findIndex(element=>element.id===idProduct)
        return items[pos].stock
    }

    return (
        <CartContext.Provider value={{  items, getAll,updateStock,cart,addCart,cantTotal,priceTotal,deleteProdCart,stockAvailable,updateProdCart,addOrder,lastOrder,order,clear}}>
            {children}
        </CartContext.Provider>
    );

}

function CartConsumer({ defaultValue = [], children }) {
    return (
        <CartContext.Consumer>
            {children}
        </CartContext.Consumer>
    );
}


export { CartProvider, CartConsumer, CartContext };