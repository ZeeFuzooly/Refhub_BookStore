import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { Box, Title, Button, TextInput, Paper, Stack } from "@mantine/core";
import { useRouter } from "next/router";
import { z } from "zod";
import { zodResolver } from "@mantine/form";
import {
  cardNumberRegex,
  expirationDateRegex,
  validateCardNumber,
  validateExpirationDate,
} from "../schemas/card-utils";

const creditCardSchema = z.object({
  cardNumber: z
    .string()
    .min(19, { message: "Card number must be 16 digits" })
    .refine(validateCardNumber, { message: "Invalid card number" }),
  cardHolderName: z
    .string()
    .nonempty({ message: "Card holder name is required" }),
  expirationDate: z
    .string()
    .regex(expirationDateRegex, { message: "Invalid expiration date" })
    .refine(validateExpirationDate, { message: "Invalid expiration date" }),
  cvv: z
    .string()
    .length(3, { message: "CVV must be 3 digits" })
    .or(z.string().length(4, { message: "CVV must be 4 digits" })),
});

const CreditCardPayment: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    validate: zodResolver(creditCardSchema),
    initialValues: {
      cardNumber: "",
      cardHolderName: "",
      expirationDate: "",
      cvv: "",
    },
  });

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");
    form.setFieldValue(
      "cardNumber",
      value.match(/.{1,4}/g)?.join(" ") ?? value
    );
  };

  const handleExpirationDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value.replace(/\D/g, "");
    form.setFieldValue(
      "expirationDate",
      value.match(/.{1,2}/g)?.join("/") ?? value
    );
  };

  const handleFormSubmit = async (values: any) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.push("/order-success");
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ maxWidth: 600, margin: "auto", padding: "1rem" }}>
      <Title order={2} mb="md">
        Credit Card Payment
      </Title>
      <Paper shadow="xs" p="lg" radius="md">
        <form onSubmit={form.onSubmit(handleFormSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Card Number"
              value={form.values.cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 5678 9123 4567"
              maxLength={19}
            />
            <TextInput
              label="Card Holder Name"
              {...form.getInputProps("cardHolderName")}
              placeholder="John Doe"
            />
            <TextInput
              label="Expiration Date (MM/YY)"
              value={form.values.expirationDate}
              onChange={handleExpirationDateChange}
              placeholder="MM/YY"
              maxLength={5}
            />
            <TextInput
              label="CVV"
              {...form.getInputProps("cvv")}
              placeholder="123"
              maxLength={4}
            />
          </Stack>
          <Stack mt="md" gap="xs" justify="space-between">
            <Button type="submit" loading={loading}>
              Pay Now
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/checkout")}
            >
              Back to Checkout
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default CreditCardPayment;
