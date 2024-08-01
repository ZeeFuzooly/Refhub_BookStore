// Define the interface for a Book object
export interface Book {
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string; // This field is not used in the component but might be relevant for future use
}

// Define the props for the BookCard component
export interface BookCardProps {
  book: Book;
  onAddToCart: () => void;
}

export interface BookListProps {
  search: string;
}

export interface ViewToggleProps {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

export interface BookTableProps {
  books: Book[];
  onAddToCart: (book: Book) => void;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface OrderDetail {
  bookTitle: string;
  author: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
}

export interface CheckoutFormProps {
  totalPrice: number;
  orderDetails: OrderDetail[];
}

export interface OrderDetail {
  bookTitle: string;
  author: string;
  unitPrice: number;
  totalPrice: number;
  quantity: number;
}

export interface OrderSuccessProps {
  discount?: number;
  deliveryCharges?: number;
  purchaseDate?: Date;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

export type SortOption = {
  value: string;
  label: string;
};

export type CategoryOption = {
  value: string;
  label: string;
};
