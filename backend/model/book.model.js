import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  authors: {
    type: [String], // updated to support multiple authors
    required: true
  },
  categories: {
    type: [String] // updated to support multiple categories (genres)
  },
  description: String,
  shortDescription:String,
  longDescription:String, // maps to `shortDescription` or `longDescription`
  publishedDate: Object,
  pageCount:{
    type:Number,
    default:250,
  }, // derived from publishedDate
  averageRating: {
    type: Number,
    default: 0
  },
  reviews:[{
type: mongoose.Schema.Types.ObjectId,
ref: 'Review',
  }],
  thumbnailUrl: String, // storing the image URL instead of binary
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);

