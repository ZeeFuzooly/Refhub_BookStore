import create from "zustand";

interface Book {
  title: string;
  author: string;
  price: number;
  cover: string;
}

interface CartItem {
  book: Book;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addToCart: (book: Book) => void;
  updateQuantity: (book: Book, quantity: number) => void;
  removeFromCart: (book: Book) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (book: Book) =>
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.book.title === book.title
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.book.title === book.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { items: [...state.items, { book, quantity: 1 }] };
    }),
  updateQuantity: (book: Book, quantity: number) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.book.title === book.title ? { ...item, quantity } : item
      ),
    })),
  removeFromCart: (book: Book) =>
    set((state) => ({
      items: state.items.filter((item) => item.book.title !== book.title),
    })),
  clearCart: () => set({ items: [] }),
}));
