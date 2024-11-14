require('dotenv').config()
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/user'));
app.use('/api/task', require('./routes/task'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${process.env.PORT}`));
