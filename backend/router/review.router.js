import express from 'express';
import { addReview,getReviews, getReviewsbyUserId } from '../controller/review.controller.js';
const router = express.Router();

router.post('/books/:id/reviews',addReview);
router.get('/books/:id/reviews',getReviews);
router.get('/users/:id/reviews',getReviewsbyUserId);
export default router;