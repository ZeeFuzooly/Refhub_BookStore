import { useState } from "react";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [search, setSearch] = useState("");

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <>
      {/* <SearchBar onSearch={handleSearch} /> */}
      <br />
      <BookList search={search} />
    </>
  );
}
