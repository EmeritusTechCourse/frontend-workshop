import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { Home } from "./routes/Home";
import { Cart } from "./routes/Cart";
import { NavBar } from "./components/NavBar/NavBar";
import styles from './App.module.css';
import { BasketProvider } from "./hooks/useBasket";
export const App = () => {
    return <div className={styles.background}>   
    <BasketProvider>
      <BrowserRouter >

          <NavBar>
              <input type="text"/>
              </NavBar> 
        <Routes>
          <Route path="/" element={<Home/>}/> 
          <Route path="/cart" element={<Cart/>}/> 

        </Routes>
      </BrowserRouter>
    </BasketProvider>
    </div>;
}