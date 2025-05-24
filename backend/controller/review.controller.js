import Book from '../model/book.model.js'
import Review from '../model/bookreview.model.js';

export const addReview = async (req, res) => {
  try {
    
    const bookId = req.params.id;
    const { rating, comment, userId } = req.body;
  

    if (!userId) return res.status(400).json({ message: "User ID required" });

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: "Comment is required" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: "You already reviewed this book" });
    }

    const review = new Review({
      book: bookId,
      user: userId,
      rating,
      comment,
    });
    await review.save();

    // Recalculate average rating
    const reviews = await Review.find({ book: bookId });
    const reviewCount = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount;

    book.averageRating = avgRating;
    book.reviewCount = reviewCount;
    await book.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//fetch reviews by Book id


export const getReviews = async (req, res) => {
  try {
    const id = req.params.id;

    const reviews = await Review.find({ book: id }).populate('user', 'name avatar');

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};


//fetch reviews by userId

export const getReviewsbyUserId = async (req, res) => {
  try {
    const id = req.params.id;

    const reviews = await Review.find({ user: id }).populate('book', 'title');

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error fetching reviews' });
  }
};