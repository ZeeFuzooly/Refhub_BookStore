import React from 'react';
import { Box, Grid, Title } from '@mantine/core';
import OrderSummary from './OrderSummary';
import DeliveryAddressForm from './DeliveryAddressForm';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe.js library using the public key from your .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

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

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  totalPrice,
  orderDetails,
}) => {
  const router = useRouter();

  const handleSubmit = async (values: { paymentMethod: string }) => {
    if (values.paymentMethod === 'Cash on Delivery') {
      router.push('/order-success');
    } else if (values.paymentMethod === 'Card Payment') {
      // Send a request to create a checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalPrice,
          items: orderDetails.map(detail => ({
            bookTitle: detail.bookTitle,
            unitPrice: detail.unitPrice,
            quantity: detail.quantity,
          })),
        }),
      });

      const session = await response.json();

      if (response.ok) {
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
          if (error) {
            console.error('Error redirecting to checkout:', error);
          }
        } else {
          console.error('Stripe has not been loaded properly.');
        }
      } else {
        console.error('Failed to create checkout session:', session.error);
      }
    } else {
      // Handle any other payment methods if needed
      router.push('/order-success');
    }
  };

  const handleBack = () => {
    router.push('/cart');
  };

  return (
    <Box style={{ maxWidth: 1200, margin: 'auto', padding: '1rem' }}>
      <Title order={2} style={{ textAlign: 'center' }}>
        Checkout
      </Title>
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
