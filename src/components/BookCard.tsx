import { Badge, Button, Card, Text, Image, Box } from "@mantine/core";

interface Book {
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string;
}

interface BookCardProps {
  book: Book;
  onAddToCart: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{
        height: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card.Section style={{ position: "relative" }}>
        <Image src={book.cover} height={160} alt={book.title} />
        <Badge
          color="pink"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          On Sale
        </Badge>
      </Card.Section>

      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Text
            fw={500}
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {book.title}
          </Text>
          <Text size="sm" c="dimmed">
            {book.author}
          </Text>
          <Text size="sm" mt="sm">
            Price: ${book.price}
          </Text>
        </Box>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          onClick={onAddToCart}
        >
          Add to Cart
        </Button>
      </Box>
    </Card>
  );
};

export default BookCard;
