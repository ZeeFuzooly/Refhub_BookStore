import { useCartStore } from "../stores/cartstore";
import {
  Table,
  Button,
  NumberInput,
  Text,
  Flex,
  Space,
  Title,
  Box,
  Center,
  Card,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Book, CartItem } from "../types/types";

const Cart = () => {
  const items = useCartStore((state) => state.items as CartItem[]);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const router = useRouter();

  const handleQuantityChange = (book: Book, value: number | string | null) => {
    if (value !== null && typeof value === "number") {
      updateQuantity(book, value);
    } else if (typeof value === "string") {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        updateQuantity(book, parsedValue);
      }
    }
  };

  const handleCheckout = () => {
    const orderDetails = items.map((item) => ({
      bookTitle: item.book.title,
      author: item.book.author,
      unitPrice: item.book.price,
      totalPrice: item.book.price * item.quantity,
    }));
    const totalPrice = items.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );

    router.push({
      pathname: "/checkout",
      query: {
        totalPrice: totalPrice.toFixed(2),
        orderDetails: JSON.stringify(orderDetails),
      },
    });
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleContinueShopping = () => {
    router.push("/");
  };

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.book.price * item.quantity,
    0
  );

  return (
    <Center>
      <Box style={{ maxWidth: 1000, width: "100%", padding: "1rem" }}>
        {items.length === 0 ? (
          <Card shadow="sm" padding="lg" style={{ textAlign: "center" }}>
            <Title order={3} mb="md">
              No Items in Cart
            </Title>
            <Text mb="lg">
              Your cart is empty. Add some items to it before proceeding to
              checkout.
            </Text>
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
          </Card>
        ) : (
          <>
            <Title order={2} mt="md" mb="md">
              Your Shopping Cart
            </Title>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Author</Table.Th>
                  <Table.Th>Quantity</Table.Th>
                  <Table.Th>Unit Price</Table.Th>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {items.map((item, index) => (
                  <Table.Tr key={index}>
                    <Table.Td>{item.book.title}</Table.Td>
                    <Table.Td>{item.book.author}</Table.Td>
                    <Table.Td>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) =>
                          handleQuantityChange(item.book, value)
                        }
                        min={1}
                        size="xs"
                      />
                    </Table.Td>
                    <Table.Td>${item.book.price.toFixed(2)}</Table.Td>
                    <Table.Td>
                      ${(item.book.price * item.quantity).toFixed(2)}
                    </Table.Td>
                    <Table.Td>
                      <Button
                        variant="outline"
                        color="red"
                        size="xs"
                        onClick={() => removeFromCart(item.book)}
                      >
                        Remove
                      </Button>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
            <Space h="xl" />
            <Flex
              direction={{ base: "column", sm: "row" }}
              justify="space-between"
              align="center"
              mt="lg"
              gap="md"
            >
              <Button variant="outline" onClick={handleBack}>
                Back to Home
              </Button>
              <Text size="lg">Total: ${totalPrice.toFixed(2)}</Text>
              <Button onClick={handleCheckout}>Proceed to Checkout</Button>
            </Flex>
            <Space h="xl" />
          </>
        )}
      </Box>
    </Center>
  );
};

export default Cart;
