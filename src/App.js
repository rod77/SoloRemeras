import "./App.css";
import { ItemListContainer } from "./Containers/ItemListContainer/ItemListContainer";
import { NavBarComponent } from "./Components/NavBarComponent/NavBarComponent";
import { CartProvider } from "./Context/CartContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ItemDetailContainer } from "./Containers/ItemDetailContainer/ItemDetailContainer";
import { FooterComponent } from "./Components/FooterComponent/FooterComponent";
import { CartComponent } from "./Components/CartComponent/CartComponent";
import { CheckoutComponent } from "./Components/CheckoutComponent/CheckoutComponent";
import { OrdersComponent } from "./Components/OrdersComponent/OrdersComponent";
import { NotFound } from "./utils/NotFound/NotFound";

function App() {
  return (
    <div>
      <CartProvider>
        <BrowserRouter>
          <NavBarComponent />
          <Switch>
            <Route exact path="/" component={ItemListContainer} />
            <Route
              exact
              path="/category/:category"
              component={ItemListContainer}
            />
            <Route
              exact
              path="/item/:idProducto"
              component={ItemDetailContainer}
            />
            <Route exact path="/cart" component={CartComponent} />
            <Route exact path="/checkout" component={CheckoutComponent} />
            <Route exact path="/order" component={OrdersComponent} />
            <Route exact path="*" component={NotFound} />
          </Switch>
          <FooterComponent />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;
