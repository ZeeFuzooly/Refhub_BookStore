import { useBookStore } from "../stores/bookstore";
import { useMemo } from "react";

export const useBooks = (searchTerm: string, categoryFilter: string | null, priceRange: [number, number], sortBy: string) => {
  const books = useBookStore((state) => state.books);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = searchTerm.trim()
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = categoryFilter
        ? book.category === categoryFilter
        : true;
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [books, searchTerm, categoryFilter, priceRange]);

  const sortedBooks = useMemo(() => {
    return [...filteredBooks].sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "price":
          return a.price - b.price;
        default:
          return 0;
      }
    });
  }, [filteredBooks, sortBy]);

  return sortedBooks;
};
