import React from 'react';
import { render, screen } from '@testing-library/react';
import EmptyState from './EmptyState';

jest.mock('./Heading', () => ({
  __esModule: true, 
  default: (props:any) => (
    <div data-testid="mock-heading">
      Mock Heading - {props.title} - {props.subtitle}
    </div>
  ),
}));

describe('EmptyState Component', () => {
  test('renders the default title and subtitle', () => {
    render(<EmptyState />);  

    const mockHeading = screen.getByTestId('mock-heading'); 
    expect(mockHeading).toHaveTextContent('Mock Heading - No account found - Try again by refreshing page to load latest data.'); 

  });

  test('renders with custom title and subtitle', () => {
    const customTitle = 'Custom Empty State';
    const customSubtitle = 'A different message.';
    render(<EmptyState title={customTitle} subtitle={customSubtitle} />); 

    const mockHeading = screen.getByTestId('mock-heading'); 
    expect(mockHeading).toHaveTextContent('Mock Heading - Custom Empty State - A different message.'); 

  });

  test('renders the Heading component with correct props', () => {
    render(<EmptyState />);

    const mockHeading = screen.getByTestId('mock-heading'); 
    expect(mockHeading).toHaveTextContent('Mock Heading - No account found - Try again by refreshing page to load latest data.'); 
  });
});