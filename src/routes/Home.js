import { useEffect } from "react";
import { Card } from "../components/Card/Card";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import styles from './Home.module.css';
import useBasket from "../hooks/useBasket";
export const Home = () => {
    const {loadProducts, products} = useProducts();
    const {addToBasket} = useBasket();
    useEffect(() => {
        loadProducts();
    }, []);
    const handleClick = (event, product) => {
        addToBasket(product)
    };
    return <div className={styles.wrapper}>
       {products.map(product => {
        return <div key={product.id} data-testid={product.id}>
                    <Link to={`/product/${product.id}`}>
                        <Card>
                            <img className={styles.cardImage} src={product.thumbnail} alt={product.title} />
                            <h3>{product.title}</h3>
                            <div data-testid={`${product.id}-price`}>{product.price}</div>
                            <button onClick={event => handleClick(event, product)}>Add to basket</button>
                        </Card>
                    </Link>
                </div>;
       }) }
    </div>;
}