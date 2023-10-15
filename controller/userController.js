const User = require('./../model/userModel');
const hashPassword = require('./../middleware/hash');
const Survey = require('../model/formModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

async function getUserByEmail(email) {
  try {
    const users = await User.find({
      email,
    });
    if (users.length > 0) {
      return users[0];
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      message: 'Insufficient data',
    });
  }

  try {
    // Assuming hashPassword is a function to hash the password, and getUserByEmail is a function to retrieve user details by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.json({
        message: 'User not found',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        message: 'Incorrect password',
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'User logged in successfully',
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Something went wrong',
    });
  }
};

const register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({
      message: 'Insufficient data',
    });
  }
  const hashedpass = await hashPassword(password);
  try {
    const user = await User.create({ name, email, password: hashedpass });
    res
      .json({
        user: {
          email: user.email,
          name: user.name,
        },
        message: 'user registered successfully',
      })
      .status(201);
  } catch (error) {
    console.log(error);
    res
      .json({
        message: 'something went wrong',
      })
      .status(404);
  }
};

const submitForm = async (req, res) => {
  const data = req.body;
  try {
    console.log({ data });
    if (!data)
      return res.json({
        message: 'No data',
      });
    console.log(data);

    const saveData = await Survey.insertMany([data]);
    console.log({
      saveData,
    });

    res.status(201).json({
      message: 'Successfully submitted',
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: error.message,
    });
  }
};

const getFormData = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json({
      surveys,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error while fetching surveys',
    });
  }
};

module.exports = {
  login,
  register,
  submitForm,
  getFormData,
};
