// RootLayout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RootLayout from "../../pages/layout";

// Mock the MantineProvider component to simplify the test
jest.mock("@mantine/core", () => ({
  MantineProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("RootLayout Component", () => {
  test("renders children correctly within MantineProvider", () => {
    const mockChildren = <div>Mock Child</div>;

    render(<RootLayout>{mockChildren}</RootLayout>);

    // Check if the children are rendered
    expect(screen.getByText(/Mock Child/i)).toBeInTheDocument();
  });
});
