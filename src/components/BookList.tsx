import React from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Center,
  Text,
  Pagination,
  Group,
  Paper,
} from "@mantine/core";
import SearchBar from "./SearchBar";
import Filters from "./Filter";
import BookCard from "./BookCard";
import BookTable from "./BookTable";
import { useBooks } from "../hooks/useBooks";
import { usePagination } from "../hooks/usePagination";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useCartStore } from "../stores/cartstore";
import { Book, BookListProps } from "../types/types";
import ViewToggle from "./ViewToggle";

const BookList: React.FC<BookListProps> = () => {
  const router = useRouter();
  const [view, setView] = React.useState<string>("card");
  const itemsPerPage = 8;

  // Use custom hooks
  const {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  } = useSearchFilter();
  const { books } = useBooks(searchTerm, categoryFilter, priceRange, sortBy);
  const {
    paginatedItems: paginatedBooks,
    totalPages,
    currentPage,
    setCurrentPage,
  } = usePagination(books, itemsPerPage);

  // Use cart store
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (book: Book) => addToCart(book);
  const handleNext = () => router.push("/cart");

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

      <ViewToggle view={view} setView={setView} />

      {view === "card" ? (
        paginatedBooks.length > 0 ? (
          <>
            <Grid>
              {paginatedBooks.map((book) => (
                <Grid.Col
                  key={book.title + book.author}
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
        )
      ) : (
        <BookTable books={paginatedBooks} onAddToCart={handleAddToCart} />
      )}
    </Container>
  );
};

export default BookList;
