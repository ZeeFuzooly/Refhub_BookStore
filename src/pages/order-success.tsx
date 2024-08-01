import { Box, Title, Text, Table, Paper, Center, Button } from "@mantine/core";
import { useCartStore } from "../stores/cartstore";
import { useRouter } from "next/router";

const OrderSuccess: React.FC = () => {
  const clearCart = useCartStore((state) => state.clearCart); // Get clearCart function from store
  const items = useCartStore((state) => state.items);
  const totalPrice = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  const router = useRouter();

  const handleBackToShopping = () => {
    clearCart(); // Clear cart when navigating back to shopping
    router.push("/"); // Navigate to the shopping page
  };

  const orderDetails = items.map((item) => ({
    bookTitle: item.book.title,
    author: item.book.author,
    unitPrice: item.book.price,
    totalPrice: item.book.price * item.quantity,
    quantity: item.quantity,
  }));

  return (
    <Box style={{ maxWidth: 1200, margin: "auto", padding: "1rem" }}>
      <Title order={2} style={{ textAlign: "center" }}>
        Thank You!
      </Title>
      <Title order={5} style={{ textAlign: "center" }}>
        Your order has been placed successfully.
      </Title>

      <Paper shadow="xs" mb="lg">
        <Title order={3}>Receipt</Title>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Quantity</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Total</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orderDetails.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{item.bookTitle}</Table.Td>
                <Table.Td>{item.author}</Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td>${item.unitPrice.toFixed(2)}</Table.Td>
                <Table.Td>${item.totalPrice.toFixed(2)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
          <tfoot>
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "right" }}>
                <strong>Total Price:</strong>
              </Table.Td>
              <Table.Td>
                <strong>${totalPrice.toFixed(2)}</strong>
              </Table.Td>
            </Table.Tr>
          </tfoot>
        </Table>
      </Paper>

      <Center>
        <Text size="lg" mb="lg">
          Your order will be delivered within 3-5 business days. Thank you for
          shopping with us!
        </Text>
      </Center>
      <Center>
        <Button onClick={handleBackToShopping}>Back to Shopping</Button>
      </Center>
    </Box>
  );
};

export default OrderSuccess;
