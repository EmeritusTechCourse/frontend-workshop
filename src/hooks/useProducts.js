import { useState } from "react";



export const useProducts = () => {
    const [products, setProducts] = useState([]);
    async function loadProducts() {
        const response = await fetch('https://dummyjson.com/products');
        const {products} = await response.json();
        setProducts(products)
    }
    return {
        products,
        loadProducts
    };
};