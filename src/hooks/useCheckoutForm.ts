import { useForm } from '@mantine/form';
import { z } from 'zod';
import { zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import React from 'react';

// Define the validation schema
const schema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  houseNumber: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  landmark: z.string().optional(),
  zipCode: z.string().min(1, "Zip Code is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  deliveryAddress: z.string().optional(),
});

const useCheckoutForm = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = React.useState<string>("COD");

  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      customerName: "",
      houseNumber: "",
      street: "",
      city: "",
      landmark: "",
      zipCode: "",
      contactNumber: "",
      deliveryAddress: "",
    },
  });

  const handleFormSubmit = async (values: any) => {
    router.push(paymentMethod === "COD" ? "/order-success" : "/credit-card-payment");
  };

  return { form, paymentMethod, setPaymentMethod, handleFormSubmit };
};

export default useCheckoutForm;
