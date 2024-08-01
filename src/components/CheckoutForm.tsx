import { Box, Grid, Title } from '@mantine/core';
import OrderSummary from './OrderSummary';
import DeliveryAddressForm from './DeliveryAddressForm';
import { useRouter } from 'next/router';

interface CheckoutFormProps {
  totalPrice: number;
  orderDetails: {
    bookTitle: string;
    author: string;
    unitPrice: number;
    totalPrice: number;
    quantity: number;
  }[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, orderDetails }) => {
  const handleSubmit = async (values: { paymentMethod: string }) => {
    console.log('Payment method:', values.paymentMethod);
    console.log('Form values:', values);
    // Handle order confirmation or other payment methods
  };
  const router = useRouter();
  

  const handleBack = () => {
    router.push('/cart');
  };

  return (
    <Box style={{ maxWidth: 1200, margin: 'auto', padding: '1rem' }}>
      <Title order={2} style={{ textAlign: 'center' }}>Checkout</Title>
      <Grid>
        <Grid.Col span={6}>
          <OrderSummary orderDetails={orderDetails} totalPrice={totalPrice} />
        </Grid.Col>
        <Grid.Col span={6}>
          <DeliveryAddressForm onSubmit={handleSubmit} handleBack={handleBack} />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;
