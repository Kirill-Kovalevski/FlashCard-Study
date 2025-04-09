import express from 'express';
import Flashcard from '../models/Flashcard';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const cards = await Flashcard.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newCard = new Flashcard({ question, answer });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create flashcard' });
  }
});

export default router;
