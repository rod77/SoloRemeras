import { NavLink } from 'react-router-dom'
import { CartWidgetComponent } from '../CartWidgetComponent/CartWidgetComponent'
import './NavBarComponent.css'

export const NavBarComponent = () => {
    return(
        <>
        <div className="logoPrincipal">
        <NavLink to={`/`} className="nav__link">
            <img src="/img/logo.png" alt="Logo Ecommerce" />
        </NavLink>
            </div>
        <div className="nav">    
        <div className="nav__logo"></div>                             
             <div className="nav__secciones">
                <NavLink to={`/category/Entrenamiento`} className="nav__link">
                    <div className="nav__secciones--entrenamiento nav__secciones__bt">ENTRENAMIENTO</div>
                </NavLink>
                <NavLink to={`/category/Futbol`} className="nav__link">
                    <div className="nav__secciones--futbol nav__secciones__bt">FUTBOL</div>
                </NavLink>
                <NavLink to={`/category/Moda`} className="nav__link">
                    <div className="nav__secciones--moda nav__secciones__bt">MODA</div>
                </NavLink>                
             </div>
             <div className="nav__cart">
                 <CartWidgetComponent />
             </div>
        </div>
        </>
    )
}