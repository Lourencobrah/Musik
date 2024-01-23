import Artist from "../models/Artist.js";
import bcrypt from "bcrypt";

class ArtistController {
  async create(req, res) {
    const { username, name, email, password } = req.body;

    try {
      const existingArtist = await Artist.findOne({ username });

      if (existingArtist) {
        return res.status(403).json({
          error: `Artist ${username} already exists`,
        });
      }

      const hashPassword = await bcrypt.hash(password, 14);
      await Artist.create({
        username,
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: `Artist ${username} created`,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async read(req, res) {
    const { username } = req.params;

    try {
      const artist = await Artist.findOne({ username });
      if (artist) {
        return res.status(201).json({
          artistData: [artist.username, artist.name, artist.email, artist.id],
        });
      } else {
        return res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async update(req, res) {
    const { email, newData } = req.body;

    try {
      const verifyArtist = await Artist.findOne({ email });
      if (verifyArtist) {
        Object.assign(verifyArtist, newData);
        await verifyArtist.save();
        return res.status(201).json({
          message: `User ${email} updated`,
        });
      } else {
        return res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async delete(req, res) {
    const { username, password } = req.body;

    try {
      const verifyArtist = await Artist.findOne({ username });
      if (verifyArtist) {
        const verifyPass = await Artist.findOne({ password });
        if (verifyPass) {
          await Artist.deleteOne({ username });
          return res.status(201).json({
            message: `Artist ${username} deleted`,
          });
        } else {
          return res.status(404).json({
            error: "Null or Wrong password",
          });
        }
      } else {
        return res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
}

export default new ArtistController();
