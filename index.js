const express = require('express');
var cors = require('cors')

const app = express();
const PORT = process.env.PORT || 5000;

// Enable All CORS Requests just for this test
app.use(cors())

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded());

// API Events
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => console.log('Server started on port ', PORT) );
