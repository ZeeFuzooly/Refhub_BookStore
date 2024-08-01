import { useForm } from "@mantine/form";
import { TextInput, Button, Paper, Stack, Select, Title } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@mantine/form";

const schema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  houseNumber: z.string().min(1, "House number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  landmark: z.string().optional(),
  zipCode: z.string().min(1, "Zip Code is required"),
  contactNumber: z.string().min(1, "Contact number is required"),
  deliveryAddress: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

interface DeliveryAddressFormProps {
  onSubmit: (values: { paymentMethod: string }) => void;
  handleBack: () => void;
}

const DeliveryAddressForm: React.FC<DeliveryAddressFormProps> = ({
  onSubmit,
  handleBack,
}) => {
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
      paymentMethod: "",
    },
  });

  return (
    <Paper shadow="xs" style={{ padding: "1rem" }}>
      <Title order={3}>Delivery Address</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Customer Name"
            {...form.getInputProps("customerName")}
            required
          />
          <TextInput
            label="House Number"
            {...form.getInputProps("houseNumber")}
            required
          />
          <TextInput
            label="Street"
            {...form.getInputProps("street")}
            required
          />
          <TextInput label="City" {...form.getInputProps("city")} required />
          <TextInput
            label="Landmark (optional)"
            {...form.getInputProps("landmark")}
          />
          <TextInput
            label="Zip Code"
            {...form.getInputProps("zipCode")}
            required
          />
          <TextInput
            label="Contact Number"
            {...form.getInputProps("contactNumber")}
            required
          />
          <TextInput
            label="Delivery Address (optional)"
            {...form.getInputProps("deliveryAddress")}
          />
          <Select
            label="Payment Method"
            placeholder="Select a payment method"
            data={[
              { value: "cardPayment", label: "Card Payment" },
              { value: "cashOnDelivery", label: "Cash on Delivery" },
            ]}
            {...form.getInputProps("paymentMethod")}
            required
          />
          <Button type="submit">Confirm Order</Button>
        </Stack>
      </form>
      <Button
        variant="outline"
        onClick={handleBack}
        style={{ marginTop: "1rem" }}
      >
        Back to Cart
      </Button>
    </Paper>
  );
};

export default DeliveryAddressForm;
