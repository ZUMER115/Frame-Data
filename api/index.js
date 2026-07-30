// Import the app to start the server and listen for incoming requests
const app = require('./app.js');
const pool = require('../db/db.js');

// Verify database connection before starting the server
const PORT = process.env.PORT || 3000;

pool.query('SELECT 1')
    .then(() => {
        console.log('Database connection established');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1);
    });
