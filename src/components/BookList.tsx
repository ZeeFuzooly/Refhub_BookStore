import { useBookStore } from "../stores/bookstore";
import { useCartStore } from "../stores/cartstore";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Center,
  Button,
  Text,
  Pagination,
  Group,
  Paper,
} from "@mantine/core";
import SearchBar from "./SearchBar";
import Filters from "./Filter";
import BookCard from "./BookCard";
import { Key, useState } from "react";

interface Book {
  title: string;
  author: string;
  price: number;
  cover: string;
  category: string;
}

interface BookListProps {
  search: string;
}

const BookList: React.FC<BookListProps> = ({ search }) => {
  const books = useBookStore((state: { books: any }) => state.books);
  const addToCart = useCartStore(
    (state: { addToCart: any }) => state.addToCart
  );
  const router = useRouter();

  const [sortBy, setSortBy] = useState<string>("title");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [searchTerm, setSearchTerm] = useState(search);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredBooks = books.filter(
    (book: {
      title: string;
      author: string;
      category: string;
      price: number;
    }) => {
      const matchesSearch = searchTerm.trim()
        ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesCategory = categoryFilter
        ? book.category === categoryFilter
        : true;
      const matchesPrice =
        book.price >= priceRange[0] && book.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    }
  );

  const sortedBooks = filteredBooks.sort(
    (
      a: { title: string; author: string; price: number },
      b: { title: any; author: any; price: number }
    ) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "author") return a.author.localeCompare(b.author);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    }
  );

  // Calculate the books to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = sortedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleAddToCart = (book: Book) => {
    addToCart(book);
  };

  const handleNext = () => {
    router.push("/cart"); // Redirect to cart page
  };

  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

  return (
    <Container fluid px="xs">
      <Paper shadow="xs" style={{ marginBottom: "1rem" }}>
        <Grid>
          <Grid.Col span={12}>
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Filters priceRange={priceRange} setPriceRange={setPriceRange} />
          </Grid.Col>
        </Grid>
      </Paper>

      {paginatedBooks.length > 0 ? (
        <>
          <Grid>
            {paginatedBooks.map((book: Book, index: Key | null | undefined) => (
              <Grid.Col
                key={index}
                span={{ base: 12, sm: 6, md: 4, lg: 3 }}
                mb="md"
              >
                <BookCard
                  book={book}
                  onAddToCart={() => handleAddToCart(book)}
                />
              </Grid.Col>
            ))}
          </Grid>
          <Center mt="xl">
            <Group>
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={totalPages}
                withControls
              />
            </Group>
          </Center>
        </>
      ) : (
        <Center mt="xl" style={{ minHeight: "50vh" }}>
          <Text size="lg" color="dimmed">
            No books found
          </Text>
        </Center>
      )}
    </Container>
  );
};

export default BookList;
