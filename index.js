import dotenv from 'dotenv';
import express from 'express';
import path from "path";
import cors from 'cors';
import { errorResponserHandler, invalidPathHandler } from './middleware/errorHandler.js';
import { fileURLToPath } from 'url';
import userRoutes from "./routes/userRoutes.js";
import otpRoutes from "./routes/otpRoutes.js"
import postsRoutes from "./routes/postsRoutes.js"
import commentRoutes from './routes/commentRoutes.js'
import connectDB from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/api/user', userRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, res,) => {
  res.status(500).json({ error: 'Internal Server Error', stack: err.stack });
});

app.use(errorResponserHandler);
app.use(invalidPathHandler);

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});


