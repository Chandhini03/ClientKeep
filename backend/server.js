import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//import authRoutes from "./authRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from 'cors';

dotenv.config();
connectDB(); 

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes)
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
