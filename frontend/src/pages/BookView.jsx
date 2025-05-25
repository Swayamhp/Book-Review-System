import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Review from "../components/Review.jsx";
import { useUser } from "../components/UserContext.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function BookView() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useUser();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const fetchBook = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/books/${id}`);
      if (!res.ok) throw new Error("Failed to fetch book.");
      const data = await res.json();
      setBook(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/books/${id}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews.");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error("Review fetch error:", err.message);
      setError("Error loading reviews.");
    }
  };

  const addReview = async () => {
    try {
      if (!user || !user._id) {
        setError("Please log in to submit a review.");
        return;
      }

      const res = await fetch(`${apiUrl}/api/books/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          book: id,
          userId: user._id,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review.");
      }

      await fetchReviews();
      setRating(0);
      setComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchBook();
    fetchReviews();
  }, [id]);

  const handleAddReview = () => {
    if (rating < 1 || rating > 5 || !comment.trim()) {
      setError("Please enter a rating and comment.");
      return;
    }
    setError("");
    addReview();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (!book) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-6">
        <img
          src={book.thumbnailUrl}
          alt={book.title}
          className="w-full md:w-60 h-80 object-cover rounded"
        />
        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p><strong>Author(s):</strong> {book.authors?.join(", ")}</p>
          <p><strong>Categories:</strong> {book.categories?.join(", ")}</p>
          <p><strong>Published:</strong> {
            book.publishedDate?.$date
              ? new Date(book.publishedDate.$date).toISOString().split("T")[0]
              : book.publishedDate || "N/A"
          }</p>
          <p><strong>Pages:</strong> {book.pageCount || "N/A"}</p>
          {book.shortDescription && <p>{book.shortDescription}</p>}
          {book.description && <p>{book.description}</p>}
        </div>
      </div>

      {book.longDescription && (
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Full Description</h2>
          <p className="text-gray-700 whitespace-pre-line">{book.longDescription}</p>
        </div>
      )}

      <div className="bg-white mt-6 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <Review reviews={reviews} />
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-medium mb-2">Add a Review</h3>
          {error && (
            <div className="p-4 mb-4 bg-red-100 text-red-700 border border-red-300 rounded">
              {error}
            </div>
          )}
          <div className="flex items-center gap-2 mb-2">
            <label className="text-gray-700">Rating:</label>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => {
                  setError("");
                  setRating(star);
                }}
                className={`text-xl ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            className="w-full border p-2 rounded mb-3"
            rows={3}
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => {
              setError("");
              setComment(e.target.value);
            }}
          />
          <button
            onClick={handleAddReview}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}


