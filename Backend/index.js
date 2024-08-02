const express = require('express');
const app = express();
const cors = require('cors')
app.get('/', (req, res) => {
    res.send("Hi");
})

app.use(express.json());
app.use(cors());


app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "Mukul_Bhalla_27112002";
    const email = "mb9792@srmist.edu.in";
    const roll_number = "RA2111003030252";

    if (!Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: "Invalid data format" });
    }

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && typeof item === 'string');

    alphabets.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    const highest_alphabet = alphabets.slice(-1);

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_alphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});
app.listen('3000', () => {
    console.log("Listening at PORT 3000");
})