import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";
import BookTable from "../../components/BookTable";
import { Book } from "../../types/types";

// Mock data with unique cover URLs
const mockBooks: Book[] = [
  {
    cover: "https://example.com/cover1.jpg",
    title: "Sample Book 1",
    author: "Author Name 1",
    price: 19.99,
    category: "Fiction",
  },
  {
    cover: "https://example.com/cover2.jpg",
    title: "Sample Book 2",
    author: "Author Name 2",
    price: 25.99,
    category: "Non-Fiction",
  },
];

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("BookTable", () => {
  beforeAll(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
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

    // Mock ResizeObserver
    window.ResizeObserver = ResizeObserver;
  });

  it("should render the table with books and handle pagination", async () => {
    const handleAddToCart = jest.fn();

    render(
      <MantineProvider>
        <BookTable books={mockBooks} onAddToCart={handleAddToCart} />
      </MantineProvider>
    );

    // Debug the rendered HTML
    screen.debug();

    // Verify if the images are rendered
    const bookCover1 = screen.getAllByAltText("Book Cover")[0];
    const bookCover2 = screen.getAllByAltText("Book Cover")[1];

    expect(bookCover1).toBeInTheDocument();
    expect(bookCover2).toBeInTheDocument();

    // Check if the books are rendered in the table
    expect(screen.getByText("Sample Book 1")).toBeInTheDocument();
    expect(screen.getByText("Sample Book 2")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
    expect(screen.getByText("$25.99")).toBeInTheDocument();

    // Check if the "Add to Cart" button is working
    fireEvent.click(screen.getAllByRole("button", { name: /Add to Cart/i })[0]);
    await waitFor(() => {
      expect(handleAddToCart).toHaveBeenCalledWith(mockBooks[0]);
    });

    // Check pagination (assuming the component has only one page)
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
  });
});
