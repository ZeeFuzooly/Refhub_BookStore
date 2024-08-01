import { useCartStore } from '../stores/cartstore';
import CheckoutForm from '../components/CheckoutForm';

const Page: React.FC = () => {
  // Get cart items from the store
  const items = useCartStore((state: { items: any; }) => state.items);

  // Extract order details and calculate total price
  const orderDetails = items.map((item: { book: { title: string; author: string; price: number; }; quantity: number; }) => ({
    bookTitle: item.book.title,
    author: item.book.author,
    unitPrice: item.book.price,
    totalPrice: item.book.price * item.quantity,
  }));

  const totalPrice = items.reduce((total: number, item: { book: { price: number; }; quantity: number; }) => total + item.book.price * item.quantity, 0);

  return <CheckoutForm totalPrice={totalPrice} orderDetails={orderDetails} />;
};

export default Page;
