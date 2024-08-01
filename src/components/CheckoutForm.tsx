import { Box, Grid, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import OrderSummary from './OrderSummary';
import DeliveryAddressForm from './DeliveryAddressForm';

interface CheckoutFormProps {
  totalPrice: number;
  orderDetails: {
    bookTitle: string;
    author: string;
    unitPrice: number;
    totalPrice: number;
  }[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  const [orderDetails, setOrderDetails] = useState<CheckoutFormProps['orderDetails']>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    if (router.query.orderDetails) {
      setOrderDetails(JSON.parse(router.query.orderDetails as string));
    }
    if (router.query.totalPrice) {
      setTotalPrice(parseFloat(router.query.totalPrice as string));
    }
  }, [router.query]);

  const handleSubmit = async (values: { paymentMethod: string }) => {
    console.log('Payment method:', values.paymentMethod);
    console.log('Form values:', values);
    // Handle order confirmation or other payment methods
  };

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
