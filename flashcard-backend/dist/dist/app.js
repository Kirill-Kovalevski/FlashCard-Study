"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form = document.getElementById('flashcard-form');
const questionInput = document.getElementById('question');
const answerInput = document.getElementById('answer');
const flashcardsContainer = document.getElementById('flashcards');
const saveButton = document.getElementById('save-flashcard');
const studyButton = document.getElementById('start-studying');
const flashcards = [];
form.addEventListener('submit', (e) => {
    e.preventDefault();
});
saveButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    if (!question || !answer) {
        alert('Please fill in both the question and answer!');
        return;
    }
    const flashcard = { question, answer };
    try {
        const response = yield fetch('http://localhost:3000/api/flashcards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flashcard)
        });
        if (!response.ok)
            throw new Error('Failed to save flashcard.');
        flashcards.push(flashcard);
        questionInput.value = '';
        answerInput.value = '';
        alert('Flashcard saved!');
    }
    catch (error) {
        alert('Error saving flashcard. Please try again later.');
        console.error(error);
    }
}));
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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cards_1 = __importDefault(require("./src/routes/cards"));
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api/flashcards', cards_1.default);
mongoose_1.default.connect('mongodb://localhost:27017/flashcards')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB error:', err));
exports.default = app;
