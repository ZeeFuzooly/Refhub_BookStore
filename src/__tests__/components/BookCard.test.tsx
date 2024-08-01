import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import BookCard from '../../components/BookCard'; 
import { Book } from '../../types/types';

describe('BookCard', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('should render the book details and handle Add to Cart button click', () => {
    const mockBook: Book = {
      cover: 'https://example.com/cover.jpg',
      title: 'Sample Book',
      author: 'Author Name',
      price: 20.99,
      category: 'Fiction', // Add the required category property
    };

    const mockOnAddToCart = jest.fn();

    render(
      <MantineProvider>
        <BookCard book={mockBook} onAddToCart={mockOnAddToCart} />
      </MantineProvider>
    );

    // Check if book details are rendered correctly
    expect(screen.getByText('Sample Book')).toBeInTheDocument();
    expect(screen.getByText('Author Name')).toBeInTheDocument();
    expect(screen.getByText('Price: $20.99')).toBeInTheDocument();

    // Check if the Add to Cart button is rendered and clickable
    const button = screen.getByRole('button', { name: /Add to Cart/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });
});
