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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var form = document.getElementById('flashcard-form');
var questionInput = document.getElementById('question');
var answerInput = document.getElementById('answer');
var flashcardsContainer = document.getElementById('flashcards');
var saveButton = document.getElementById('save-flashcard');
var studyButton = document.getElementById('start-studying');
var flashcards = [];
form.addEventListener('submit', function (e) {
    e.preventDefault();
});
saveButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
    var question, answer, flashcard, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                question = questionInput.value.trim();
                answer = answerInput.value.trim();
                if (!question || !answer) {
                    alert('Please fill in both the question and answer!');
                    return [2 /*return*/];
                }
                flashcard = { question: question, answer: answer };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fetch('http://localhost:3000/api/flashcards', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(flashcard)
                    })];
            case 2:
                response = _a.sent();
                if (!response.ok)
                    throw new Error('Failed to save flashcard.');
                flashcards.push(flashcard);
                questionInput.value = '';
                answerInput.value = '';
                alert('Flashcard saved!');
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                alert('Error saving flashcard. Please try again later.');
                console.error(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
studyButton.addEventListener('click', function () {
    flashcardsContainer.innerHTML = '';
    if (flashcards.length === 0) {
        flashcardsContainer.innerHTML = '<p>No flashcards saved yet!</p>';
        return;
    }
    flashcards.forEach(function (card) {
        var cardElement = document.createElement('div');
        cardElement.classList.add('flashcard');
        cardElement.innerHTML = "\n        <p>" + card.question + "</p>\n        <p style=\"color: #777;\">" + card.answer + "</p>\n      ";
        flashcardsContainer.appendChild(cardElement);
    });
});
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var flashcards_1 = require("./flashcard-backend/src/routes/flashcards");
var app = express_1["default"]();
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use('/api/flashcards', flashcards_1["default"]);
// MongoDB connection
mongoose_1["default"].connect('mongodb://localhost:27017/flashcards')
    .then(function () { return console.log('MongoDB connected'); })["catch"](function (err) { return console.error('MongoDB error:', err); });
exports["default"] = app;
