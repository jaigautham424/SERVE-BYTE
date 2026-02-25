const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/servebyte';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/donors', require('./routes/donors'));
app.use('/api/donations', require('./routes/donations'));
app.use('/api/ngos', require('./routes/ngos'));
app.use('/api/deliveries', require('./routes/deliveries'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/chat', require('./routes/chat'));

app.get('/', (req, res) => {
    res.json({ message: 'SERVEBYTE API is running 🚀' });
});

app.listen(PORT, () => {
    console.log(`🌐 SERVEBYTE server running on port ${PORT}`);
});
