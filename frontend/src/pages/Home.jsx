import  { useState, useEffect } from "react";
import BookCard from "../components/BookCard.jsx";

const ratings = [1, 2, 3, 4, 5];

const Home = () => {
  const [genre, setGenre] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [booksData, setBooksData] = useState([]);
  const [genresList, setGenresList] = useState(["All"]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchBooks = async () => {
    try {
      const query = new URLSearchParams({
        page: currentPage,
        limit: 8,
        genre: genre !== "All" ? genre : "",
        search,
        minRating: minRating || "",
      });

      const res = await fetch(`${apiUrl}/api/books?${query.toString()}`);
      const data = await res.json();

      if (res.ok) {
        setBooksData(data.books);
        setTotalPages(data.totalPages);

        // Dynamically collect unique genres from books
        const genreSet = new Set();
        data.books.forEach((book) => {
          book.categories?.forEach((cat) => genreSet.add(cat));
        });

        setGenresList(["All", ...Array.from(genreSet)]);
      } else {
        console.error("Failed to fetch books");
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  // Refetch when filters or page change
  useEffect(() => {
    fetchBooks();
  }, [currentPage, genre, search, minRating]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
    setCurrentPage(1);
  };

  const handleRatingChange = (e) => {
    setMinRating(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="lg:w-64 w-full bg-white p-6 border-b lg:border-b-0 lg:border-r space-y-4">
        <h2 className="text-xl font-bold">Filters</h2>

        <input
          type="text"
          placeholder="Search by title or author"
          value={search}
          onChange={handleSearchChange}
          className="w-full border px-3 py-2 rounded"
        />

        <div>
          <label className="block mb-1 font-medium">Genre</label>
          <select
            value={genre}
            onChange={handleGenreChange}
            className="w-full border px-3 py-2 rounded"
          >
            {genresList.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Minimum Rating</label>
          <select
            value={minRating}
            onChange={handleRatingChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={0}>All</option>
            {ratings.map((r) => (
              <option key={r} value={r}>
                {r} & up
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Books</h1>

        {booksData.length === 0 ? (
          <p className="text-gray-500">No books match your filters.</p>
        ) : (
          <>
            <BookCard filteredBooks={booksData} />

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-indigo-700 text-amber-50 hover:bg-indigo-700 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-indigo-700 text-amber-50  rounded hover:bg-indigo-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;






