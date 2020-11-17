const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
  }, 
  username: {
    type: String,
    minlength: 8,
    required: true
  },
  identification: {
    type: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
  },
  password: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true
  }
});
const todo = (module.exports = mongoose.model("user", userSchema));