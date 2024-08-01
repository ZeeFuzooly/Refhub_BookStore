# RedHub Book Store Project

## Overview

This project is a responsive web application for a book store. It allows users to browse, search, and purchase books, manage their cart, and proceed to checkout. The application is built using React with TypeScript, Next.js 14, and various other modern web technologies.

## Features

- Display a list of books with titles, authors, covers, and other relevant information
- Search, sort, and filter books
- Pagination for book list
- Add books to a shopping cart
- Checkout process with form validation
- Responsive design and accessibility features
- Integration with Stripe for payment processing
- Ability to add books to favorites

## Technologies Used

- **Frontend:** React, TypeScript, Next.js 14, Mantine UI
- **Backend:** Next.js API routes
- **State Management:** Zustand
- **Form Validation:** Zod
- **Testing:** Jest
- **Payment Processing:** Stripe
- **Database:** MongoDB (planned)
- **Routing:** React Router
- **Deployment:** Vercel

## Setup Instructions

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB (if using MongoDB for data storage)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/ZeeFuzooly/Refhub_BookStore.git>

### Navigate to the project directory:

- cd book-store-project
- Install the dependencies:

npm install
# or
yarn install
- Set up environment variables. Create a .env.local file in the root directory and add the following variables:



npm run dev
# or
yarn dev

The application will be available at http://localhost:3000.

### Usage
- Navigate to the home page to browse the book catalog.
- Use the search bar to find specific books.
- Sort and filter books using the provided options.
- Add books to your cart and proceed to checkout.
- During checkout, provide necessary delivery details and payment information.
- View order summary and confirm purchase.

### Additional Considerations
- Testing: Ensure to run tests using npm test or yarn test to verify functionality.
- Deployment: Follow deployment guidelines based on the hosting platform you choose.
- Contributing: Contributions are welcome! Please refer to the CONTRIBUTING.md file for more information.


### Acknowledgments
- Mantine for UI components
- Stripe for payment processing
- TanStack Table for data handling
- Next.js for server-side rendering and routing
