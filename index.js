const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// API Events
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => console.log('Server started on port ', PORT) );
