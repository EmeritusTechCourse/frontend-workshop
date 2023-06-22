import { useProducts } from "./useProducts";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import { dummyProductResponse } from "../dummy-data/product-response";
import { useEffect } from "react";
import {render, waitFor} from '@testing-library/react';
import {screen, fireEvent} from '@testing-library/dom'
import useBasket, { BasketProvider } from "./useBasket";

describe('useBasket', () => {
  it('adds an item to the basket', async () => {
    const firstDummyElement = dummyProductResponse.products[0]
    const Dummy = () => {
        const {addToBasket, items} = useBasket();
        
        return <div>
            <button onClick={() => addToBasket(firstDummyElement)} data-testid="basket-button">Add to basket</button>
            {items.map((item)=> {
                return <div data-testid={`basket-row-${item.id}`} key={item.id}>{item.title}</div>
            })}
        </div>;
    };
    render(<BasketProvider>
            <Dummy/>
            </BasketProvider>);
    const button = screen.getByTestId('basket-button');
    fireEvent.click(button,
        new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        }));
        await waitFor(async () => {
            const basketElement = screen.queryByTestId(`basket-row-${firstDummyElement.id}`);
            expect(basketElement).not.toBeNull();
        });
  });
});