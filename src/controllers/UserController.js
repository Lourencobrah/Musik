import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
  async create(req, res) {
    const { username, name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(403).json({
          error: `User ${username} already exists`,
        });
      }

      const hashPassword = await bcrypt.hash(password, 14);
      await User.create({
        username,
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: `User ${username} created`,
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
      const user = await User.findOne({ username });
      if (user) {
        return res.status(201).json({
          userData: [user._id, user.username, user.name, user.email],
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
    const { username, newData } = req.body;

    try {
      const verifyUser = await User.findOne({ username });

      if (verifyUser) {
        Object.assign(verifyUser, newData);
        await verifyUser.save();
        return res.status(201).json({
          message: `User ${username} updated`,
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
      const verifyUser = await User.findOne({ username });
      if (verifyUser) {
        const verifyPass = await User.findOne({ password });
        if (verifyPass) {
          await User.deleteOne({ username });
          return res.status(201).json({
            message: `User ${username} deleted`,
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
      return res.status(500).send({
        error: "Internal Server Error",
      });
    }
  }
}

export default new UserController();
