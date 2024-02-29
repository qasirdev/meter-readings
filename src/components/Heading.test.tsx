import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading Component', () => {
  test('renders the title correctly', () => {
    const title = 'My Test Heading';
    render(<Heading title={title} />);

    const headingElement = screen.getByText(title); 
    expect(headingElement).toBeInTheDocument();
  });

  test('renders the subtitle if provided', () => {
    const subtitle = 'A descriptive subtitle';
    render(<Heading title="Test Title" subtitle={subtitle} />);

    const subtitleElement = screen.getByText(subtitle);
    expect(subtitleElement).toBeInTheDocument();
  });

  test('should not render subtitle if not provided', () => {
    render(<Heading title="Test Title" />);

    const subtitleElement = screen.queryByText('A descriptive subtitle');
    expect(subtitleElement).not.toBeInTheDocument();
  });

  test('should apply text-center class if center prop is true', () => {
    render(<Heading title="Test Title" center />); 

    const headingWrapper = screen.getByTestId('heading-wrapper');
    expect(headingWrapper).toHaveClass('text-center');
  });
});