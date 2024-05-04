const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
  },
  phone: { type: Number, minLength: 8,  required: true },
  password: { type: String, minLength: 6, required: true },

  url: {
    type: mongoose.Schema.Types.ObjectId,
   
  
  }

});

const User = mongoose.model("User", UserSchema);

module.exports = User;