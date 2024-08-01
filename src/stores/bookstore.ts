import create from "zustand";
import { mockBooks, Book } from '../__mocks__/booksMock';

interface BookStore {
  favourites: Book[];
  books: Book[];
  addBook: (book: Book) => void;
  addToFavourites: (book: Book) => void;
}

export const useBookStore = create<BookStore>((set) => ({
  books: mockBooks,
  favourites: [],
  addBook: (book: Book) => set((state) => ({
    books: [...state.books, book],
  })),
  addToFavourites: (book: Book) => set((state) => ({
    favourites: state.favourites.includes(book)
      ? state.favourites.filter((b) => b !== book)
      : [...state.favourites, book],
  })),
}));
