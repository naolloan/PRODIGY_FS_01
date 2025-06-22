const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { sequelize } = require('./model/index');

// Import route
const userRoutes = require('./route/user.route');


dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for frontend
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));

// Correct route usage
app.use('/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync(); 
    })
    .then(() => {
        console.log('Models synced!');
    })
    .catch(err => {
        console.error('Error connecting to the database:', err);
    });
