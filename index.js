require('./db/db');
const express = require('express');
const app = express();
const port = 3500;
const {
  login,
  register,
  submitForm,
  getFormData,
} = require('./controller/userController');
const { connectDb } = require('./db/db');

app.use(express.json());
app.post('/login', login);
app.post('/register', register);
app.post('/form/submit', submitForm);
app.get('/formdata', getFormData);

app.get('/', (req, res) => {
  res.send('App is running');
});

const startSever = () =>
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });

connectDb(startSever);
