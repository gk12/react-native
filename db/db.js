const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

async function connectDb() {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
}

connectDb();
