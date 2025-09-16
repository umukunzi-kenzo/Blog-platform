const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // connecting using connection string from the .env file
        const conn = await mongoose.connect(process.env.MONGO_URI, {});

        // ✅ Use backticks for template strings
        console.log(`Through wizardly manners we are connected to MongoDB: ${conn.connection.host}`);
    } catch (error) {
        // ✅ Same here, so it shows the actual error message
        console.error(`The wizard has failed to wizardly connect to MongoDB: ${error.message}`);
        process.exit(1); // stop the app if DB connection fails
    }
};

// to export the function so that other files can use it
module.exports = connectDB;
