import { Box, Paper, Title } from '@mantine/core';

interface OrderDetails {
  bookTitle: string;
  author: string;
  unitPrice: number;
  totalPrice: number;
}

interface OrderSummaryProps {
  orderDetails: OrderDetails[];
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderDetails, totalPrice }) => {
  return (
    <Paper shadow="xs" style={{ marginBottom: '1rem', padding: '1rem' }}>
      <Title order={3}>Order Summary</Title>
      {orderDetails && orderDetails.length > 0 ? (
        orderDetails.map((item, index) => (
          <Box key={index} style={{ marginBottom: '1rem' }}>
            <Title order={5}>{item.bookTitle}</Title>
            <p>Author: {item.author}</p>
            <p>Unit Price: ${item.unitPrice.toFixed(2)}</p>
            <p>Total: ${item.totalPrice.toFixed(2)}</p>
          </Box>
        ))
      ) : (
        <p>No order details available.</p>
      )}
      <Title order={4} style={{ textAlign: 'center' }}>Total Price: ${totalPrice.toFixed(2)}</Title>
    </Paper>
  );
};

export default OrderSummary;
