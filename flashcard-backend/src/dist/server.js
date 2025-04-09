"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var cards_1 = require("./routes/cards");
var app = express_1["default"]();
var PORT = 3000;
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use('/api/flashcards', cards_1["default"]);
mongoose_1["default"].connect('mongodb://localhost:27017/flashcards')
    .then(function () {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, function () {
        return console.log("\uD83D\uDE80 Server running at http://localhost:" + PORT);
    });
})["catch"](function (err) { return console.error(' MongoDB connection error:', err); });
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:" + PORT);
});
