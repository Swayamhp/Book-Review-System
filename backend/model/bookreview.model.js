import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // assumes you have a User model
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number, // 1 to 5
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
