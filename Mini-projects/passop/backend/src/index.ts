import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
// import listRoutes from './routes/list.routes';
// app.use('/api/list', listRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/passop';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
