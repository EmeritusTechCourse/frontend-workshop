import { createContext, useContext, useMemo, useState } from "react";
import { act } from "react-dom/test-utils";



const BasketContext = createContext({});


export function BasketProvider({children}){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    async function addToBasket (item) {
        act(() => {
            setItems([
                ...items,
                item
            ]);
        });
    }

   
    const memoizedValue = useMemo(() => ({
        loading,
       items,
       addToBasket
    }), [items, loading]);

    return <>
        <BasketContext.Provider value={memoizedValue}>
            {children}
        </BasketContext.Provider>
    </>

}

export default function useBasket(){
    return useContext(BasketContext);
}