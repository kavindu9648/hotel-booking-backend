import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function postUsers(req, res) {
  const user = req.body;

  const password = req.body.password;

  const passwordHash = bcrypt.hashSync(password, 10);

  user.password = passwordHash;
  const newUser = new User(user);
  newUser
    .save()
    .then(() => {
      res.json({
        message: "User Created Succesfully.",
      });
    })
    .catch(() => {
      res.json({
        message: "Error Creating User",
      });
    });
}
export function loginUser(req, res) {
  const credentials = req.body;
  const passwordHash = bcrypt.hashSync(credentials.password, 10);

  User.findOne({
    email: credentials.email,
    password: passwordHash,
  }).then((user) => {
    if (User == null) {
      res.status(403).json({
        message: "User not found",
      });
    } else {
      const isPasswordValid = bcrypt.compareSync(
        credentials.password,
        user.password
      );
      if (isPasswordValid) {
        res.status(403).json({
          message: "Incorrecr Password",
        });
      } else {
        const payload = {
          id: user._id,
          email: user.email,
          type: user.type,
        };
      }
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "1h" });
      res.json({
        message: "User found",
        user: user,
        token: token,
      });
    }
  });
}
