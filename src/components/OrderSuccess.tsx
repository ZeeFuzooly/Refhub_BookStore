import React from 'react';
import { Box, Title, Text, Table, Paper, Center, Button } from "@mantine/core";
import { useCartStore } from "../stores/cartstore";
import { useRouter } from "next/router";
import { OrderSuccessProps, OrderDetail } from '../types/types';

const OrderSuccess: React.FC<OrderSuccessProps> = ({
  discount = 0,
  deliveryCharges = 0,
  purchaseDate = new Date(), 
}) => {
  const clearCart = useCartStore((state) => state.clearCart);
  const items = useCartStore((state) => state.items);

  const totalPrice = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  // Calculate delivery charges if not provided
  const calculatedDeliveryCharges = deliveryCharges || Math.floor(Math.random() * (20 - 5 + 1)) + 5;

  // Calculate final total price after discount and adding delivery charges
  const finalTotalPrice = totalPrice - discount + calculatedDeliveryCharges;

  const router = useRouter();

  const handleBackToShopping = () => {
    clearCart();
    router.push("/");
  };

  const orderDetails: OrderDetail[] = items.map((item) => ({
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

      <Paper shadow="xs" mb="lg" >
        <Title order={3}>Receipt</Title>
        <Text size="md" mb="lg">
          Purchase Date: {purchaseDate.toLocaleDateString()} {purchaseDate.toLocaleTimeString()}
        </Text>
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
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "right" }}>
                <strong>Discount:</strong>
              </Table.Td>
              <Table.Td>
                <strong>-${discount.toFixed(2)}</strong>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "right" }}>
                <strong>Delivery Charges:</strong>
              </Table.Td>
              <Table.Td>
                <strong>+${calculatedDeliveryCharges.toFixed(2)}</strong>
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td colSpan={4} style={{ textAlign: "right" }}>
                <strong>Final Total Price:</strong>
              </Table.Td>
              <Table.Td>
                <strong>${finalTotalPrice.toFixed(2)}</strong>
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
