import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from "path";
import cors from 'cors';
import { errorResponserHandler, invalidPathHandler } from './middleware/errorHandler.js';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());


import userRoutes from "./routes/userRoutes.js";

// import postsRoute from './routes/posts.routes';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

app.use('/api/user', userRoutes);
// app.use('/posts', postsRoute);

app.use((err, res,) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use(errorResponserHandler);
app.use(invalidPathHandler);

// // static assets
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const PORT = process.env.PORT || 7777;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
});
