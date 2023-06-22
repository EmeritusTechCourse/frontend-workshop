import { useProducts } from "./useProducts";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { dummyProductResponse } from "../dummy-data/product-response";
import { useEffect } from "react";
import {render, waitFor} from '@testing-library/react';
import {screen} from '@testing-library/dom'

describe('useProducts', () => {
    const server = setupServer(
        rest.get('https://dummyjson.com/products', (req, res, ctx) => {
          return res(ctx.json(dummyProductResponse))
        }),
      )
    it('loads data from the API', async () => {

        const DummyComponent = () => {
            //Arrange
            const productsHook = useProducts();
            useEffect(() => {
                async function loadProducts() {
                    //Act
                    await productsHook.loadProducts();
                }
                loadProducts();
            }, []);
            return <div>
                {productsHook.products.map(product => {
                    return <div key={product.id}>{product.id}</div>
                })}
            </div>
        }
        render(<DummyComponent/>);
        //Assert
        await waitFor(() => {
            for(const product of dummyProductResponse.products){
                const element = screen.queryByText(product.id);
                expect(element).not.toBeNull();
            }
        });
    });
});