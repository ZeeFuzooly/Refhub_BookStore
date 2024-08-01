import { useState } from "react";

export const useSearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState<string>("title");

  return {
    searchTerm,
    setSearchTerm,
    categoryFilter,
    setCategoryFilter,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
  };
};
