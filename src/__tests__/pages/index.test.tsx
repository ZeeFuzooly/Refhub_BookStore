import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/index";
import "@testing-library/jest-dom";

// Mock the BookList component with a displayName
jest.mock('../../components/BookList', () => {
  const MockBookList = () => <div>BookList Component</div>;
  MockBookList.displayName = 'BookList';
  return MockBookList;
});

describe("Home Component", () => {
  test("renders properly", () => {
    render(<Home />);

    // Check if BookList component is rendered
    expect(screen.getByText(/BookList Component/i)).toBeInTheDocument();
  });
});
