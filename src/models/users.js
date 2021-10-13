const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  publicWishlist: { type: Boolean },
  wishList: [{
    title: {
      type: String
    },
    comentary: {
      type: String
    },
    note: {
      type: Number
    },
    stars: {
      type: Number
    },
    publicAvaliation: {
      type: Boolean
    },
  }],
});
mongoose.model('users', UserSchema);

