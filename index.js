require('./db/db');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3500;
const {
  login,
  register,
  submitForm,
  getFormData,
} = require('./controller/userController');

app.use(express.json())
app.post('/login', login);
app.post('/register', register);
app.post('/form/submit', submitForm);
app.get('/formdata', getFormData);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
