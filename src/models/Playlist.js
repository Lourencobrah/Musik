import mongoose from "mongoose";

const Playlist = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
});

export default mongoose.model("Playlist", Playlist);