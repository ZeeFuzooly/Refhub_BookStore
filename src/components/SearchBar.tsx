import { Select, TextInput, Group, Stack } from "@mantine/core";
import { useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string | null;
  setCategoryFilter: (category: string | null) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  categoryFilter,
  setCategoryFilter,
}) => {
  return (
    <Stack>
      <TextInput
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ flex: 1 }}
      />
      <Group>
        <Select
          label="Sort by"
          placeholder="Select sorting criteria"
          value={sortBy}
          onChange={(value) => setSortBy(value || "title")}
          style={{ width: 590 }}
          data={[
            { value: "title", label: "Title" },
            { value: "author", label: "Author" },
            { value: "price", label: "Price" },
          ]}
        />
        <Select
          label="Category"
          placeholder="Select category"
          value={categoryFilter || ""}
          onChange={(value) => setCategoryFilter(value || null)}
          style={{ width: 600 }}
          data={[
            { value: "", label: "All" },
            { value: "Fiction", label: "Fiction" },
            { value: "Non-Fiction", label: "Non-Fiction" },
            { value: "Academic", label: "Academic" },
          ]}
        />
      </Group>
    </Stack>
  );
};

export default SearchBar;
