import Book from '../model/book.model.js';

/**
 * Add a new book to the database.
 */
export const addBook = async (req, res, next) => {
  try {
    const {
      title,
      authors,
      categories,
      description,
      publishedDate,
      thumbnailUrl,
    } = req.body;

    if (!title || !authors || authors.length === 0) {
      return res.status(400).json({ message: 'Title and at least one author are required.' });
    }

    const newBook = new Book({
      title,
      authors: Array.isArray(authors) ? authors : [authors],
      categories: Array.isArray(categories) ? categories : (categories ? [categories] : []),
      description,
      publishedDate,
      thumbnailUrl
    });
   
    await newBook.save();

    res.status(201).json({
      message: 'Book added successfully.',
      book: newBook
    });
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Server error.' });
    next(error);
  }
};

export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { genre, search, minRating } = req.query;

    // Build dynamic query
    const query = {};

    if (genre && genre !== "All") {
      query.categories = genre;
    }

    if (search) {
      const regex = new RegExp(search, "i"); // Case-insensitive
      query.$or = [
        { title: regex },
        { authors: { $elemMatch: { $regex: regex } } },
      ];
    }

    if (minRating) {
      query.averageRating = { $gte: parseFloat(minRating) };
    }

    // Count total with filters
    const totalBooks = await Book.countDocuments(query);

    // Fetch filtered books with pagination
    const books = await Book.find(query)
    .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      page,
      totalPages: Math.ceil(totalBooks / limit),
      totalBooks,
      books,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Server error while fetching books" });
  }
};


export const getSingleBook = async (req, res) => {
  try {
    const reqId = req.params.id;

    const book = await Book.findById(reqId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Error fetching single book:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


//  Book.insertMany(booksData);

