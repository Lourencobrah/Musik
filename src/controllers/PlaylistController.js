import Playlist from "../models/Playlist.js";

class PlaylistController {
  async create(req, res) {
    const { name, autor } = req.body;

    const playlist = await Playlist.create({
      name,
      autor,
    });

    return res.status(201).json({
      message: `Playlist ${name} created`,
    });
  }

  async read(req, res) {
    const { name } = req.params;

    try {
      const playlist = await Playlist.findOne({ name });

      if (playlist) {
        return res.status(200).json({
          message: `Playlist ${name} founded`,
          playlistData: [playlist.name],
        });
      } else {
        return res.status(404).json({
          error: `The playlist ${name} don't exist, you need create`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async update(req, res) {
    const { name, newData } = req.body;

    try {
      const verifyPlaylist = await Playlist.findOne({ name });
      if (verifyPlaylist) {
        Object.assign(verifyPlaylist, newData);
        await verifyPlaylist.save();
        return res.status(200).json({
          message: `Playlist ${name} updated`,
          playlistData: `New data ${verifyPlaylist}`,
        });
      } else {
        return res.status(404).json({
          error: "User not found",
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
      const verifyPlaylist = await Playlist.findOne({ name });
      if (verifyPlaylist) {
        await Playlist.deleteOne({ name });
        return res.status(200).json({
          message: `Playlist ${name} deleted`,
        });
      } else {
        return res.status(404).json({
          error: "Playlist not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

export default new PlaylistController();
