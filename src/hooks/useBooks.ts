import { useState, useEffect } from "react";
import { Book } from "../types/types";

export const useBooks = (
  searchTerm: string,
  categoryFilter: string | null,
  priceRange: [number, number],
  sortBy: string
) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Fetch books from the API
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => {
        let filteredBooks = data as Book[]; // Ensure that data is treated as Book[]

        // Apply search term filter
        if (searchTerm) {
          filteredBooks = filteredBooks.filter(
            (book: Book) =>
              book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              book.author.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Apply category filter
        if (categoryFilter) {
          filteredBooks = filteredBooks.filter(
            (book: Book) => book.category === categoryFilter
          );
        }

        // Apply price range filter
        if (priceRange) {
          filteredBooks = filteredBooks.filter(
            (book: Book) =>
              book.price >= priceRange[0] && book.price <= priceRange[1]
          );
        }

        // Apply sorting
        filteredBooks.sort((a: Book, b: Book) => {
          if (sortBy === "title") return a.title.localeCompare(b.title);
          if (sortBy === "author") return a.author.localeCompare(b.author);
          if (sortBy === "price") return a.price - b.price;
          return 0;
        });

        setBooks(filteredBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [searchTerm, categoryFilter, priceRange, sortBy]);

  return { books };
};
