export interface Book {
    category: string;
    title: string;
    author: string;
    cover: string;
    price: number;
  }
  
  export const mockBooks: Book[] = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "https://m.media-amazon.com/images/I/81af+MCATTL.jpg", price: 15, category: "Fiction" },
    { title: "1984", author: "George Orwell", cover: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg", price: 20, category: "Fiction" },
    { title: "To Kill a Mockingbird", author: "Harper Lee", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 18, category: "Fiction" },
    { title: "Sapiens", author: "Yuval Noah Harari", cover: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg", price: 25, category: "Non-Fiction" },
    { title: "Educated", author: "Tara Westover", cover: "https://m.media-amazon.com/images/I/81WojUxbbFL.jpg", price: 22, category: "Non-Fiction" },
    { title: "Becoming", author: "Michelle Obama", cover: "https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg", price: 28, category: "Non-Fiction" },
    { title: "A Brief History of Time", author: "Stephen Hawking", cover: "https://m.media-amazon.com/images/I/91ebghaV-eL._AC_UF1000,1000_QL80_.jpg", price: 15, category: "Academic" },
    { title: "The Selfish Gene", author: "Richard Dawkins", cover: "https://m.media-amazon.com/images/I/91c1m6y5V5L.jpg", price: 18, category: "Academic" },
    { title: "Introduction to Algorithms", author: "Thomas H. Cormen", cover: "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg", price: 45, category: "Academic" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 10, category: "Fiction" },
    { title: "Brave New World", author: "Aldous Huxley", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg", price: 14, category: "Fiction" },
    { title: "Freakonomics", author: "Steven D. Levitt", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 16, category: "Non-Fiction" },
    { title: "The Alchemist", author: "Paulo Coelho", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 12, category: "Fiction" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", cover: "https://m.media-amazon.com/images/I/713jIoMO3UL.jpg", price: 19, category: "Non-Fiction" },
    { title: "Clean Code", author: "Robert C. Martin", cover: "https://m.media-amazon.com/images/I/413za4fzZLL.jpg", price: 40, category: "Academic" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt", cover: "https://m.media-amazon.com/images/I/41as+WafrFL.jpg", price: 35, category: "Academic" },
    { title: "The Road", author: "Cormac McCarthy", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg", price: 12, category: "Fiction" },
    { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 14, category: "Non-Fiction" },
    { title: "Atomic Habits", author: "James Clear", cover: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg", price: 23, category: "Non-Fiction" },
    { title: "Grit", author: "Angela Duckworth", cover: "https://m.media-amazon.com/images/I/81OthjkJBuL.jpg", price: 21, category: "Non-Fiction" },
    { title: "Dune", author: "Frank Herbert", cover: "https://m.media-amazon.com/images/I/81v2g3QBNsL.jpg", price: 18, category: "Science Fiction" },
    { title: "Neuromancer", author: "William Gibson", cover: "https://m.media-amazon.com/images/I/41erHnxoTxL.jpg", price: 22, category: "Science Fiction" },
    { title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", cover: "https://m.media-amazon.com/images/I/91zbR12c8eL.jpg", price: 17, category: "Science Fiction" },
    { title: "The Power of Habit", author: "Charles Duhigg", cover: "https://m.media-amazon.com/images/I/81bK35g+06L.jpg", price: 20, category: "Non-Fiction" },
    { title: "The Art of War", author: "Sun Tzu", cover: "https://m.media-amazon.com/images/I/51s8bHi8HIL.jpg", price: 14, category: "Non-Fiction" },
    { title: "Meditations", author: "Marcus Aurelius", cover: "https://m.media-amazon.com/images/I/81BFx5vbuRL.jpg", price: 16, category: "Non-Fiction" },
    { title: "The Shining", author: "Stephen King", cover: "https://m.media-amazon.com/images/I/91w+GQmeA0L.jpg", price: 25, category: "Horror" },
    { title: "It", author: "Stephen King", cover: "https://m.media-amazon.com/images/I/81Omf9-5mLL.jpg", price: 30, category: "Horror" },
    { title: "Dracula", author: "Bram Stoker", cover: "https://m.media-amazon.com/images/I/71C7BY4G5-L.jpg", price: 12, category: "Horror" },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", cover: "https://m.media-amazon.com/images/I/51dZaCq+ZNL.jpg", price: 18, category: "Mystery" },
    { title: "Gone Girl", author: "Gillian Flynn", cover: "https://m.media-amazon.com/images/I/51s-VyABJ9L.jpg", price: 20, category: "Mystery" },
    { title: "Big Little Lies", author: "Liane Moriarty", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg", price: 22, category: "Mystery" },
    { title: "Educated", author: "Tara Westover", cover: "https://m.media-amazon.com/images/I/81WojUxbbFL.jpg", price: 22, category: "Non-Fiction" },
    { title: "The Handmaid's Tale", author: "Margaret Atwood", cover: "https://m.media-amazon.com/images/I/81Y8N7p+dRL.jpg", price: 24, category: "Dystopian" },
    { title: "Brave New World", author: "Aldous Huxley", cover: "https://m.media-amazon.com/images/I/71kxa1-0mfL.jpg", price: 16, category: "Dystopian" },
  ];
  