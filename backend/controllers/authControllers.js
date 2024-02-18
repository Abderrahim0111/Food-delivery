const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, phone, password, email } = req.body;
    if (!username || !phone || !password || !email) {
      return res.json({ error: "All fields are required" });
    }
    const isPhone = await User.findOne({ phone: phone });
    if (isPhone) return res.json({ error: "Phone number taken" });
    const isEmail = await User.findOne({ email: email });
    if (isEmail) return res.json({ error: "Email taken" });
    const user = await User.create(req.body);
    if (!user) {
      return res.json({ error: "Registration error, try again!" });
    }
    const { password: pass, ...rest } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
    return res.json(rest);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) {
      return res.json({ error: "All fields are required" });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) return res.json({ error: "Register first" });
    const match = await bcrypt.compare(password, isUser.password);
    if (!match) return res.json({ error: "Incorrect password" });
    const token = jwt.sign({ id: isUser._id }, process.env.JWT);
    const { password: pass, ...rest } = isUser._doc;
    res.cookie("jwt", token, { httpOnly: true, maxAge: 365 * 24 * 60 * 60 * 1000 });
    return res.json(rest);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.json({message: "logged out successfully"})
    } catch (error) {
        res.json({error: error.message})
    }
}

const isAuth = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT, (err) => {
      if (err) {
        return res.json({ error: "requireAuth" });
      }
      res.json({message: "isAuth"})
    });
  } else {
    res.json({ error: "requireAuth" });
  }
};

module.exports = {
  login,
  register,
  logout,
  isAuth,
};
