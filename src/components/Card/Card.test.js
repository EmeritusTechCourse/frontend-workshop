import React from 'react';
import { render } from '@testing-library/react';
import {screen} from '@testing-library/dom'
import { Card } from './Card';

describe('<Card />', () => {
  it('renders the child content', () => {
    // arrange
    render(
        <Card><div data-testid='card-content'></div></Card>)
    //act
    const element = screen.queryByTestId('card-content');
    //assert
    expect(element).not.toBeNull();

  });

});