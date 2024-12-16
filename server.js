const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


app.use(bodyParser.json());


app.post('/submit-feedback', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const feedbackData = `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        -----------------------------
    `;

    const feedbackFilePath = path.join(__dirname, 'feedback/feedback.txt');

    
    fs.appendFile(feedbackFilePath, feedbackData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).json({ error: 'Failed to save feedback' });
        }
        res.status(200).json({ message: 'Feedback submitted successfully' });
    });
});


app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const port = 80;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} or http://ikt.frontier.hu`);
});
