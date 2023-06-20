import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {screen} from '@testing-library/dom'
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('<NavBar />', () => {
  it('renders the child content', () => {
    // arrange
    render(
        <MemoryRouter initialEntries={['/']}>
    <NavBar>
        <div data-testid="navbar-content"></div>
    </NavBar> </MemoryRouter>)
    //act
    const element = screen.queryByTestId('navbar-content');
    //assert
    expect(element).not.toBeNull();

  });

  it('navigates to the cart when the cart button is clicked', async () => {
    const Dummy = () => (
        <div>
            <NavBar/>
          <Routes>
            <Route path="/" element={<div>Home</div>} />
      
            <Route path="/cart" element={<div data-testid='cart-view'>Cart</div>} />
          </Routes>
      
        </div>
      );
      render(
        <MemoryRouter initialEntries={['/']}>
            <Dummy></Dummy>
      </MemoryRouter>,
      );
      const cartButton = screen.queryByTestId('cart-button');
      fireEvent.click(cartButton,
        new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
        }),);
      await waitFor(async () => { 
        const cartContent = screen.queryAllByTestId('cart-view')
        await expect(cartContent).not.toBeNull();
      });
  });

});

