import React, { useState } from "react";
import { addBook } from "../../utils/addBookfunc.js";
import LoadingSpinner from "../../utils/LoadingSpinner.jsx";

const AddBookModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState(""); // comma-separated string
  const [categories, setCategories] = useState(""); // comma-separated string
  const [description, setDescription] = useState("");
  const [publishedYear, setPublishedYear] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = {
        title,
        authors: authors.split(",").map((a) => a.trim()).filter(Boolean),
        categories: categories.split(",").map((c) => c.trim()).filter(Boolean),
        description,
        publishedDate: publishedYear,
        thumbnailUrl:imageUrl,
      };

      const data = await addBook(formData);
      if (data) onClose();

      // Reset fields
      setTitle("");
      setAuthors("");
      setCategories("");
      setDescription("");
      setPublishedYear("");
      setImageUrl("");
    } catch (err) {
      setError(err.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Book</h2>

        {error && (
          <div className="mb-6 p-4 text-red-700 bg-red-100 border border-red-300 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="text"
            placeholder="Authors (comma separated)"
            value={authors}
            onChange={(e) => setAuthors(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="text"
            placeholder="Categories (comma separated)"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="date"
            placeholder="dd/mm/yyyy"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="url"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300"
            >
              Cancel
            </button>
            {loading && <LoadingSpinner />}
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;

