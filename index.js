import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from "path";
import cors from 'cors';
import { errorResponserHandler, invalidPathHandler } from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);
// app.use('/posts', postsRoute);


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
app.use((err, res,) => {
  res.status(500).json({ error: 'Internal Server Error', stack: err.stack });
});

app.use(errorResponserHandler);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 7777;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
});

