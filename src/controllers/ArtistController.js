import Artist from "../models/Artist.js";
import bcrypt from "bcrypt";

class ArtistController {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingArtist = await Artist.findOne({ email });

      if (existingArtist) {
        return res.status(403).json({
          error: `Artist ${name} already exists`,
        });
      }

      const hashPassword = await bcrypt.hash(password, 14);
      await Artist.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: `Artist ${name} created`,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }

  async read(req, res) {
    const { name } = req.params;

    try {
      const artist = await Artist.findOne({ name });
      if (artist) {
        return res.status(201).json({
          message: `Artist ${name} founded`,
          artistData: [artist.name, artist.email, artist.id],
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
          updatedUser: `New data ${verifyArtist}`,
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
    const { name, email } = req.body;

    try {
      const verifyArtist = await Artist.findOne({ email });
      if (verifyArtist) {
        await Artist.deleteOne({ email });
        return res.status(201).json({
          message: `User ${name} deleted`,
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
}

export default new ArtistController();
