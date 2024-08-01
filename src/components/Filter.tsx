import { Select, RangeSlider, Box, Stack, Text } from "@mantine/core";

interface FiltersProps {
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
}

const Filters: React.FC<FiltersProps> = ({ priceRange, setPriceRange }) => {
  return (
    <Box mb="lg">
      <Text size="lg" mb="xs">
        Filter by Price
      </Text>
      <RangeSlider
        label="Price Range"
        min={0}
        max={100}
        step={1}
        value={priceRange}
        onChange={setPriceRange}
        marks={[
          { value: 0, label: "$0" },
          { value: 50, label: "$50" },
          { value: 100, label: "$100" },
        ]}
        mb="md"
      />
    </Box>
  );
};

export default Filters;
