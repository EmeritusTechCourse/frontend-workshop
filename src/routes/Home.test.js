import React from 'react';
import { render, waitFor } from '@testing-library/react';
import {screen, fireEvent} from '@testing-library/dom'
import {Home} from './Home';
import { dummyProductResponse } from "../dummy-data/product-response";
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import {Routes, Route, MemoryRouter} from 'react-router-dom';
import useBasket, { BasketProvider } from '../hooks/useBasket';
describe('<Home />', () => {
    const server = setupServer(
        rest.get('https://dummyjson.com/products', (req, res, ctx) => {
          return res(ctx.json(dummyProductResponse))
        }),
      )
      const Dummy = () => (
        <BasketProvider>
            <div>
            <Routes>
                <Route path="/" element={<Home/>} />
        
                <Route path="/product/:id" element={<div data-testid='product-view'>Product view</div>} />
            </Routes>
        
            </div>
        </BasketProvider>
      );
    it('renders the text content of the products', async () => {
      // arrange
      render(<MemoryRouter initialEntries={['/']}>
        <Dummy/>
      </MemoryRouter>
      )
      
  
    //Assert
        await waitFor(() => {
            for(const product of dummyProductResponse.products){
                const element = screen.queryByText(product.title);
                expect(element).not.toBeNull();
            }
        });
    });
    it('renders the price of the products', async () => {
        // arrange
        render(<MemoryRouter initialEntries={['/']}>
        <Dummy/>
      </MemoryRouter>
      )
        
    
      //Assert
          await waitFor(() => {
              for(const product of dummyProductResponse.products){
                  const price = screen.queryByTestId(`${product.id}-price`);
                  expect(price).toHaveTextContent(product.price);
              }
          });
      });
      it('renders the image content of the products', async () => {
        // arrange
        render(<MemoryRouter initialEntries={['/']}>
        <Dummy/>
      </MemoryRouter>
      )
   
        
    
      //Assert
          await waitFor(() => {
              for(const product of dummyProductResponse.products){
                const card = screen.queryByTestId(product.id);
                const element = card.querySelector('img');
                expect(element.src).toBe(product.thumbnail)
              }
          });
      });



  it('navigates to the product details page when the product is clicked', async () => {
      
      for(const product of dummyProductResponse.products){
        render(
            <MemoryRouter initialEntries={['/']}>
                <Dummy></Dummy>
          </MemoryRouter>,
          );

            const card = await screen.findByTestId(product.id);
            fireEvent.click(card,
                new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                }),);
            await waitFor(async () => {
                const productViewContent = screen.queryAllByTestId('product-view')
                await expect(productViewContent).not.toBeNull();
            });
    }

   
  });
  it('adds item to basket when add to basket is clicked', async () => {
    render(
        <MemoryRouter initialEntries={['/']}>
            <Dummy></Dummy>
      </MemoryRouter>,
      );
    for(const product of dummyProductResponse.products){
     

          const card = await screen.findByTestId(product.id);
          fireEvent.click(card,
              new MouseEvent('click', {
              bubbles: true,
              cancelable: true,
              }),);
          await waitFor(async () => {
              const productViewContent = screen.queryAllByTestId('product-view')
              await expect(productViewContent).not.toBeNull();
          });
  }

 
});
    it('adds an item to the basket on click', async () => {
        // arrange
        const HomeWithBasket = () => {
            const {items} = useBasket();
            return <MemoryRouter initialEntries={['/']}>
            <Home/>
            {items.map((item)=> {
                return <div data-testid={`basket-row-${item.id}`} key={item.id}>{item.title}</div>
            })}
        </MemoryRouter>
        };
        render(<BasketProvider><HomeWithBasket/></BasketProvider>)

        

    //Assert
    for(const product of dummyProductResponse.products){
        const card = await screen.findByTestId(product.id);
        const button = card.querySelector('button');
        fireEvent.click(button,
            new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            }),);       
            await waitFor(async () => {
                const result = await screen.findByTestId(`basket-row-${product.id}`)
                expect(result).not.toBeNull();
           
            });
        }
    });
});  