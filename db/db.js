const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_URL;

async function connectDb(cb) {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
    cb();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectDb,
};
