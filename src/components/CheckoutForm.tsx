import React from 'react';
import { Box, Grid, Title, Button, Paper, Stack } from '@mantine/core';
import OrderSummary from './OrderSummary';
import FormFields from '../components/reusable-components/FormFields';
import PaymentMethodSelector from '../components/reusable-components/PaymentMethodSelector';
import useCheckoutForm from '../hooks/useCheckoutForm';
import { CheckoutFormProps } from '../types/types'
import { useRouter } from 'next/router';

const CheckoutForm: React.FC<CheckoutFormProps> = ({ totalPrice, orderDetails }) => {
  const { form, paymentMethod, setPaymentMethod, handleFormSubmit } = useCheckoutForm();
  const router = useRouter();

  return (
    <Box className="checkout-form">
      <Title order={2} mb="md">Checkout</Title>
      <Grid>
        <Grid.Col span={5}>
          <OrderSummary 
            orderDetails={orderDetails} 
            totalPrice={totalPrice} 
            deliveryCharges={0} 
          />
        </Grid.Col>
        <Grid.Col span={7}>
          <Paper shadow="xs" p="lg" radius="md">
            <Title order={3} mb="md">Delivery Address</Title>
            <form onSubmit={form.onSubmit(handleFormSubmit)}>
              <FormFields form={form} />
              <Box mt="lg">
                <Title order={3} mb="md">Payment Method</Title>
                <PaymentMethodSelector 
                  value={paymentMethod} 
                  onChange={setPaymentMethod} 
                />
              </Box>
              <Stack mt="md" gap="xs" justify="space-between">
                <Button type="submit">Confirm Order</Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/cart")}
                >
                  Back to Cart
                </Button>
              </Stack>
            </form>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default CheckoutForm;
