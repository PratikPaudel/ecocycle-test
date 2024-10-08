const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("node:path");
const morgan = require("morgan");
const expressLayouts = require('express-ejs-layouts');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

// Create an express app
const app = express();
const PORT = process.env.PORT || 8080;

// Morgan Functionality
app.use(morgan('dev'));

// Set up express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layout');

// Adding Path module and EJS to app.js
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
    res.render('pages/home');
});

app.use('/admin', adminRoutes);
app.use('/admin', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}. Use http://localhost:${PORT}/`);
});
