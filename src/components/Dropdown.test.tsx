import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react'; 
import userEvent from '@testing-library/user-event';
import {Dropdown} from './Dropdown';

describe('Dropdown Component', () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];

  test('renders with provided label', () => {
    const label = 'Choose an option:';
    render(<Dropdown options={options} label={label} selectedValue="" onValueChange={() => {}} />);

    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });
});