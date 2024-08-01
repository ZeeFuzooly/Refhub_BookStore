import { Paper, Table, Title, Text, Divider } from "@mantine/core";

interface OrderSummaryProps {
  totalPrice: number;
  orderDetails: {
    bookTitle: string;
    author: string;
    unitPrice: number;
    totalPrice: number;
    quantity: number;
  }[];
  discount?: number;
  deliveryCharges?: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  totalPrice,
  orderDetails,
  discount = 0, // Default to 0 if not provided
  deliveryCharges = 0, // Default to 0 if not provided
}) => {
  // Calculate the total number of units
  const totalUnits = orderDetails.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate final total price after discount and adding delivery charges
  const finalTotalPrice = totalPrice - discount + deliveryCharges;

  return (
    <Paper shadow="xs" style={{ marginBottom: "1rem", padding: "1rem" }}>
      <Title order={3}>Order Summary</Title>

      {orderDetails && orderDetails.length > 0 ? (
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Book Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Unit Price</Table.Th>
              <Table.Th>Total Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {orderDetails.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{item.bookTitle}</Table.Td>
                <Table.Td>{item.author}</Table.Td>
                <Table.Td>${item.unitPrice.toFixed(2)}</Table.Td>
                <Table.Td>${item.totalPrice.toFixed(2)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      ) : (
        <p>No order details available.</p>
      )}

      <Divider my="md" />

      <Text mt="md" size="lg">
        Total Price = ${totalPrice.toFixed(2)}
      </Text>
      <Text mt="md" size="sm">
        Discount = -${discount.toFixed(2)}
      </Text>
      <Text mt="md" size="sm">
        Delivery Charges = +${deliveryCharges.toFixed(2)}
      </Text>
      <hr />
      <Title order={4} style={{ textAlign: "center", marginTop: "1rem" }}>
        Final Total Price = ${finalTotalPrice.toFixed(2)}
      </Title>
    </Paper>
  );
};

export default OrderSummary;
