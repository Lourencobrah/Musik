import mongoose from "mongoose";

const Album = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Album", Album);
