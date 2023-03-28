import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModal from "../models/user.js";

import sendMail from "../config/mail.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModal.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({ message: "User Does Not exists" });
    }

    const isPasswordCorrect = await oldUser.comparePassword(password);
    if (!isPasswordCorrect) {
      // password is incorrect section
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = await oldUser.generateJWTToken();

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

    const result = await UserModal.create({
      email,
      password,
      name: `${firstName} ${lastName}`,
    });

    const token = await result.generateJWTToken();

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
      const token = await oldUser.generateJWTToken();
      return res.status(200).json({ result, token });
    }

    const result = await UserModal.create({
      email,
      name,
      googleId,
    });
    sendMail(email);
    const token = await result.generateJWTToken();

    res.status(200).json({ result, token });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Something Went Wrong !! -> error message : ${err}` });
  }
};
