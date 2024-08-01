import React from 'react';
import { Select, TextInput, Group, Stack } from "@mantine/core";
import { SearchBarProps, SortOption, CategoryOption } from '../types/types'; 

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  categoryFilter,
  setCategoryFilter,
}) => {
  // Define sort and category options with types
  const sortOptions: SortOption[] = [
    { value: "title", label: "Title" },
    { value: "author", label: "Author" },
    { value: "price", label: "Price" },
  ];

  const categoryOptions: CategoryOption[] = [
    { value: "", label: "All" },
    { value: "Fiction", label: "Fiction" },
    { value: "Non-Fiction", label: "Non-Fiction" },
    { value: "Academic", label: "Academic" },
  ];

  return (
    <Stack>
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "100%" }}
      />
      <Group>
        <Select
          label="Sort by"
          placeholder="Select sorting criteria"
          value={sortBy}
          onChange={(value) => setSortBy(value || "title")}
          style={{ flex: 1 }}
          data={sortOptions}
        />
        <Select
          label="Category"
          placeholder="Select category"
          value={categoryFilter || ""}
          onChange={(value) => setCategoryFilter(value || null)}
          style={{ flex: 1 }}
          data={categoryOptions}
        />
      </Group>
    </Stack>
  );
};

export default SearchBar;
