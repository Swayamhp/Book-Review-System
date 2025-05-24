import StarRating from './StarRating.jsx';
import { Link } from "react-router-dom";

const BookCard = ({ filteredBooks }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-0">
      {filteredBooks.map((book) => (
        <div
          key={book._id}
          className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col"
        >
          <img
            src={book.thumbnailUrl}
            alt={book.title}
            className="h-48 w-full object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{book.title}</h3>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-medium">Author(s):</span> {book.authors.join(", ")}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <span className="font-medium">Category:</span> {book.categories.join(", ")}
          </p>

          <StarRating book={book} />

          <div className="mt-auto pt-2">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-medium">Published:</span>{" "}
              {book.publishedDate?.$date
                ? new Date(book.publishedDate.$date).toISOString().split("T")[0]
                : book.publishedDate || "N/A"}
            </p>
            <Link
              to={`books/${book._id}`}
              className="inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-800"
            >
              See Reviews →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCard;

