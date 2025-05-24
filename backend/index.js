import express from 'express';
import connectDb from './utils/database.js';
import cors from 'cors';
import userRoutes from './router/user.router.js';
import bookRoutes from './router/book.router.js'
import reviewRoutes from './router/review.router.js'
import {notFound,errorHandler} from './utils/errorHandler.js';

const app = express();

//connect to mongodb
connectDb();

//set up middle ware
app.use(cors({
  origin: 'http://localhost:5173' // React dev server URL
}));
app.use(express.json());
const PORT = process.env.PORT || 5000;

//test api
app.use('/api/test',(req,res,next)=>{
  res.json({message:"This is test "});
});
//user register
app.use('/api',userRoutes);

//for book adding or get list
app.use('/api',bookRoutes)

//add review
app.use('/api',reviewRoutes);
// Error Middleware (Always Last)
app.use(notFound);
app.use(errorHandler);


app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`);
})

