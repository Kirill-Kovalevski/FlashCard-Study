interface Flashcard {
    question: string;
    answer: string;
  }
  
  const form = document.getElementById('flashcard-form') as HTMLFormElement;
  const questionInput = document.getElementById('question') as HTMLInputElement;
  const answerInput = document.getElementById('answer') as HTMLInputElement;
  const flashcardsContainer = document.getElementById('flashcards') as HTMLDivElement;
  const saveButton = document.getElementById('save-flashcard') as HTMLButtonElement;
  const studyButton = document.getElementById('start-studying') as HTMLButtonElement;
  const flashcards: Flashcard[] = [];
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });
  saveButton.addEventListener('click', async () => {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
  
    if (!question || !answer) {
      alert('Please fill in both the question and answer!');
      return;
    }
  
    const flashcard: Flashcard = { question, answer };
  
    try {
      const response = await fetch('http://localhost:3000/api/flashcards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(flashcard)
      });
  
      if (!response.ok) throw new Error('Failed to save flashcard.');
  
      flashcards.push(flashcard);
      questionInput.value = '';
      answerInput.value = '';
      alert('Flashcard saved!');
    } catch (error) {
      alert('Error saving flashcard. Please try again later.');
      console.error(error);
    }
  });
  
  studyButton.addEventListener('click', () => {
    flashcardsContainer.innerHTML = '';
    if (flashcards.length === 0) {
      flashcardsContainer.innerHTML = '<p>No flashcards saved yet!</p>';
      return;
    }
  
    flashcards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('flashcard');
      cardElement.innerHTML = `
        <p>${card.question}</p>
        <p style="color: #777;">${card.answer}</p>
      `;
      flashcardsContainer.appendChild(cardElement);
    });
  });
  import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import flashcardRoutes from './src/routes/cards';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/flashcards', flashcardRoutes);
mongoose.connect('mongodb://localhost:27017/flashcards')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

export default app;

  