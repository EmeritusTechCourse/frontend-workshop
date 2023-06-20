import { Link } from "react-router-dom";
import styles from './NavBar.module.css';
export const NavBar = ({children}) => {
    return (<div className={styles.navbar}>
        <div>
            Shop Loop
        </div>
        <div>
            {children}
        </div>
        <div>
            <Link to='/cart' data-testid='cart-button'>Cart</Link>
        </div>
    </div>)
};