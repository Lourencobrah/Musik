import mongoose from "mongoose";
import Album from "../models/Album.js";

class AlbumController {
  async create(req, res) {
    const { name, id } = req.body;

    const verifyAlbum = await Album.findOne({ name });
    if (verifyAlbum) {
      return res.status(403).json({
        message: `Album ${name} already exist`,
      });
    } else if (!verifyAlbum) {
      const album = await Album.create({
        name,
        artist: id,
      });

      console.log(verifyAlbum);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          message: "Invalid Id"
        });
      }

      const populatedAlbum = await Album.findOne({ _id: album._id }).populate(
        "artist"
      );

      return res.status(201).json({
        message: `Album ${name} created`,
        album: populatedAlbum,
      });
    } else {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async read(req, res) {
    const { name } = req.params;

    try {
      const album = await Album.findOne({ name });
      if (album) {
        return res.status(200).json({
          message: `Album ${name} founded`,
          albumData: album,
        });
      } else {
        return res.status(404).json({
          message: `The album ${album.name} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Somenthing is wrong",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    const { name, newData } = req.body;

    try {
      const verifyAlbum = await Album.findOne({ name });
      if (verifyAlbum) {
        Object.assign(verifyAlbum, newData);
        await verifyAlbum.save();
        return res.status(200).json({
          message: `The album ${name} has been updated`,
          playlistData: `New data ${verifyAlbum}`,
        });
      } else {
        return res.status(404).json({
          error: `The album ${name} does not exist`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Something is wrong",
      });
    }
  }

  async delete(req, res) {
    const { name } = req.body;

    try {
      const verifyAlbum = await Album.findOne({ name });
      if (verifyAlbum) {
        await Album.deleteOne({ name });
        return res.status(200).json({
          message: `The album ${name} has been deleted`,
        });
      } else {
        return res.status(404).json({
          message: `The album ${name} does not exist`,
          error: message,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Something is wrong",
        error: message,
      });
    }
  }
}

export default new AlbumController();
