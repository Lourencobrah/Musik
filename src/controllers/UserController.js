import User from "../models/User.js";
import bcrypt from "bcrypt";

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(403).json({
          error: `User ${name} already exists`,
        });
      }

      const hashPassword = await bcrypt.hash(password, 14);
      await User.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: `User ${name} created`,
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
      const user = await User.findOne({ name });
      if (user) {
        return res.status(201).json({
          message: `User ${name} founded`,
          userData: [user.name, user.email],
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
      const verifyUser = await User.findOne({ email });

      if (verifyUser) {
        Object.assign(verifyUser, newData);
        await verifyUser.save();
        return res.status(201).json({
          message: `User ${email} updated`
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
      const verifyUser = await User.findOne({ email });
      if (verifyUser) {
        await User.deleteOne({ email });
        return res.status(201).json({
          message: `User ${name} deleted`,
        });
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
