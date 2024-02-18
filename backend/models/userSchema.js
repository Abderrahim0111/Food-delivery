const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    phone: String,
    password: String,
    role: {type: String, default: "client"},
    storeLocation: String,
    storeCity: String,
    storeName: String,
    storeImage: String,
    storeCategories: [String],
    modified: {type: Boolean, default: false},
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password ,salt)
  next()
})

const User = mongoose.model("User", userSchema);
module.exports = User;
