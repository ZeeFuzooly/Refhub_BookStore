import { useState } from 'react';
import BookList from '../components/BookList';

export default function Home() {
  const [search, setSearch] = useState('');

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <>

      <BookList search={search} />
    </>
  );
}
