import { response } from "express";
import user from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ msg: "All fields not entered" });
    }

    const existinguser = await user.findOne({ email });

    if (existinguser) {
      return res.status(400).json({ msg: "Existing User" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newuser.save();

    res.status(201).json({ msg: "Succesful Signup" });
  } catch (err) {
    res.status(500).json({ msg: "unsuccesful Signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Incomplete input" });
    }

    const userinput = await user.findOne({ email });

    if (!userinput) {
      return res.status(400).json({ msg: "User not registered " });
    }

    const isMatched = await bcrypt.compare(password, userinput.password);

    if (!isMatched) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const token = jwt.sign({ id: userinput._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(201).json({
      msg: "Successfully Logged IN",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({ msg: "Error Logging In" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const currentUser = await user.findById(req.userId).select("-password");
    if (!currentUser) {
      return res.status(404).json({ msg: "Not found" });
    }
    res.json(currentUser);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

//module.exports = {signup}; OLD to be used with CommonJS (require)
