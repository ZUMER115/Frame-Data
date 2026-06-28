// Import the express-rate-limit package to create a rate limiter middleware
const limitRate = require('express-rate-limit');

// Create a rate limit middleware to limit the number of requests a user can make to the API within a certain time frame
const rateLimiter = limitRate({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: { message: 'Too many requests from this IP, please try again after 15 minutes' }
})

// Export the rate limiter middleware to be used in the main application
module.exports = { rateLimiter };