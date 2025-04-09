import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import flashcardRoutes from './routes/cards';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api/flashcards', flashcardRoutes);

mongoose.connect('mongodb://localhost:27017/flashcards')
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch(err => console.error(' MongoDB connection error:', err));
  import app from '/dist/app.js';

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

