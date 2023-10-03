const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    const db = mongoose.connection;
    console.log(`MongoDB Connected: ${db.host} ${db.name}`.bgMagenta.white);
  } catch (error) {
    console.log(`ERROR: ${error.message}`.bgRed);
    process.exit(1);
  }
};

module.exports = connectDb;
