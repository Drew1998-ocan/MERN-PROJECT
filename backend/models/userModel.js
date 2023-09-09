const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validate = require("validator");
const Schema = mongoose.Schema;
const userSchema = Schema({
  email: {
    type: "String",
    required: true,
    unique: true,
  },
  password: {
    type: "String",
    required: true,
  },
});

// static signup method and put all the logic validations here too as well

userSchema.statics.signup = async function (email, password) {
  // doing the validation of the credentials

  if (!email || !password) {
    throw Error("all the fields must be filled with the right content");
  }

  if (!validate.isEmail(email)) {
    throw Error("email must be a valid email");
  }

  if (!validate.isStrongPassword(password)) {
    throw Error(
      "password must be strong and validates to the conditions stated in the guidelines"
    );
  }

  
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("email already being used");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};
module.exports = mongoose.model("User", userSchema);
