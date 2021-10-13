import mongoose from 'mongoose'
const Schema = mongoose.Schema

const WishList = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "users", required: true
  },
  movies: [{
    title: {
      type: String
    },
    note: {
      type: Number
    },
    stars: {
      type: Number
    },
    comment: {
      type: String
    },
  }
  ],
   public: {
    type: Boolean
  }

});

mongoose.model("wishList", WishList);
