// Importing module
import express from 'express';
import { categories, ItemToShow } from './database/data';
import cors from 'cors';


const app = express();
let recievedId;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));

const PORT: number = 3000;

// Handling GET / Request
app.get('/', (req, res) => {
    try {
        const prizes = categories;
        res.send(prizes);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});

app.get('/getItems/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id); 
        const item = ItemToShow.find(item => item.id === id);
        res.send(item);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
});


  




// Server setup
app.listen(PORT, () => {
    console.log('The application is listening on port http://localhost:' + PORT);
});
