"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importing module
const express_1 = __importDefault(require("express"));
const data_1 = require("./database/data");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
let recievedId;
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
const PORT = 3000;
// Handling GET / Request
app.get('/', (req, res) => {
    try {
        const prizes = data_1.categories;
        res.send(prizes);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
app.get('/getItems/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const item = data_1.ItemToShow.find(item => item.id === id);
        res.send(item);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});
// Server setup
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
});
