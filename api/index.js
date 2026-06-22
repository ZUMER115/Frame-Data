// Import the app to start the server and listen for incoming requests
const app = require('./app.js');

// Start the server and listen on the specified port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

