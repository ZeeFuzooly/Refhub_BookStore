import { useCartStore } from '../stores/cartstore';
import { Table, Button, NumberInput, Text, Flex, Space, Title, Box, Center } from '@mantine/core';
import { useRouter } from 'next/router';
import { Key } from 'react';

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

const Cart = () => {
  const items = useCartStore((state: { items: CartItem[]; }) => state.items as CartItem[]);
  const updateQuantity = useCartStore((state: { updateQuantity: (book: Book, quantity: number) => void; }) => state.updateQuantity);
  const removeFromCart = useCartStore((state: { removeFromCart: (book: Book) => void; }) => state.removeFromCart);
  const router = useRouter();

  const handleQuantityChange = (book: Book, value: number | string | null) => {
    if (value !== null && typeof value === 'number') {
      updateQuantity(book, value);
    } else if (typeof value === 'string') {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        updateQuantity(book, parsedValue);
      }
    }
  };

  const handleCheckout = () => {
    const orderDetails = items.map(item => ({
      bookTitle: item.book.title,
      author: item.book.author,
      unitPrice: item.book.price,
      totalPrice: item.book.price * item.quantity
    }));
    const totalPrice = items.reduce((total, item) => total + item.book.price * item.quantity, 0);

    router.push({
      pathname: '/checkout',
      query: {
        totalPrice: totalPrice.toFixed(2),
        orderDetails: JSON.stringify(orderDetails)
      }
    });
  };

  const handleBack = () => {
    router.push('/');
  };

  // calculate total price
  const totalPrice = items.reduce((total: number, item: CartItem) => {
    return total + item.book.price * item.quantity;
  }, 0);

  return (
    <Center>
      <Box style={{ maxWidth: 1000, width: '100%', padding: '1rem' }}>
        <Title order={2} mt="md" mb="md">Your Shopping Cart</Title>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Actions</Table.Th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: CartItem, index: Key | null | undefined) => (
              <tr key={index}>
                <Table.Td>{item.book.title}</Table.Td>
                <Table.Td>{item.book.author}</Table.Td>
                <Table.Td>
                  <NumberInput
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.book, value)}
                    min={1}
                    size="xs"
                  />
                </Table.Td>
                <Table.Td>${item.book.price.toFixed(2)}</Table.Td>
                <Table.Td>${(item.book.price * item.quantity).toFixed(2)}</Table.Td>
                <Table.Td>
                  <Button 
                    variant="outline" 
                    color="red" 
                    size="xs" 
                    onClick={() => removeFromCart(item.book)}
                  >
                    Remove
                  </Button>
                </Table.Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Flex justify="space-between" align="center" mt="lg">
          <Button variant="outline" onClick={handleBack}>Back to Home</Button>
          <Text size="lg">Total: ${totalPrice.toFixed(2)}</Text>
          <Button onClick={handleCheckout}>Proceed to Checkout</Button>
        </Flex>
        <Space h="xl" />
      </Box>
    </Center>
  );
};

export default Cart;
