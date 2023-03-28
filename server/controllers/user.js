import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

import sendMail from "../config/mail.js";

const secret = "test";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({ message: "User Does Not exists" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      // password is incorrect section
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "24h",
    });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something Went Wrong !! -> error message : ${err}` });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "24h",
    });
    sendMail(email);
    res.status(201).json({ result, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something Went Wrong !! -> error message : ${err}` });
  }
};

export const googleSignIn = async (req, res) => {
  const { email, name, googleId } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (oldUser) {
      const result = { _id: oldUser._id.toString(), email, name };
      const token = jwt.sign({ email: result.email, id: result._id }, secret, {
        expiresIn: "24h",
      });
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });
    sendMail(email);
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "24h",
    });


    res.status(200).json({ result, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something Went Wrong !! -> error message : ${err}` });
  }
};
