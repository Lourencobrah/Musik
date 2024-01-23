import mongoose from "mongoose";

const Artist = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Artist", Artist);
