const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);

  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

module.exports = hashPassword;
