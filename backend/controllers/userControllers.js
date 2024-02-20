const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const fetchUser = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ error: "User fetching error" });
    }

    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
    if (req.body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const user = await User.findByIdAndUpdate(decoded.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.json({ error: "User update error" });
    }
    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchPartners = async (req, res) => {
  try {
    const searchTerm = req.query.search || "";
    const partners = await User.find({
      role: "partner",
      $or: [
        { username: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({
      createdAt: -1,
    });

    const noPass = partners.map((partner) => {
      const { password, ...rest } = partner._doc;
      return rest;
    }); 

    res.json(noPass);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchUsers = async (req, res) => {
  try {
    const searchTerm = req.query.search || ""
    const users = await User.find({
      $or: [
        {username: {$regex: searchTerm, $options: "i"}},
        {email: {$regex: searchTerm, $options: "i"}}
      ]
    }).sort({ createdAt: -1 });
    const filtredUsers = users.filter((user) => {
      return user.role !== "admin";
    });
    const noPass = filtredUsers.map((user) => {
      const { password, ...rest } = user._doc;
      return rest;
    });
    res.json(noPass);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const addPartner = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.json({ message: "Role updated successfully!" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const setStoreInfo = async (req, res) => {
  try {
    const { storeCity, storeName, storeImage } = req.body;
    if (!storeCity || !storeName || !storeImage)
      return res.json({ error: "All fields are required" });
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
    const user = await User.findByIdAndUpdate(
      decoded.id,
      {
        storeCity: storeCity,
        storeImage: storeImage,
        storeName: storeName,
        modified: true,
      },
      { new: true }
    );
    if (!user) return res.json({ error: "An error occured, try again" });
    const { password, ...rest } = user._doc;
    res.json(rest);
  } catch (error) {
    res.json(error.message);
  }
};

const fetchStores = async (req, res) => {
  try {
    const stores = await User.find({
      role: "partner",
      modified: true,
    });
    const storesRequiredInfo = [];
    stores.map((store) => {
      storesRequiredInfo.push({
        storeImage: store.storeImage,
        storeName: store.storeName,
      });
    });
    res.json(storesRequiredInfo);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchStoresByCity = async (req, res) => {
  try {
    if (!req.params.storeCity)
      return res.json({ error: "invalid informations" });
    const stores = await User.find({ storeCity: req.params.storeCity });
    const storesRequiredInfo = [];
    stores.map((store) => {
      storesRequiredInfo.push({
        storeImage: store.storeImage,
        storeName: store.storeName,
      });
    });
    res.json(storesRequiredInfo);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchUserCategories = async (req, res) => {
  try {
    const user = await User.findOne({ storeName: req.params.storeName });

    res.json(user.storeCategories);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const uploadStoreImage = async (req, res) => {
  try {
    if (!req.file) return res.json({ error: "No image selected" });
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result) return res.json({ error: "Upload error" });
    res.json(result.secure_url);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchAvailableCities = async (req, res) => {
  try {
    const stores = await User.find({ modified: true });
    const storeCities = [];

    stores.map((store) => {
      storeCities.push(store.storeCity);
    });
    const uniqueCities = [...new Set(storeCities)];
    res.json(uniqueCities);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchStoreImage = async (req, res) => {
  try {
    const store = await User.findOne({ storeName: req.params.storeName });

    res.json({
      storeImage: store.storeImage,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
  fetchUser,
  fetchPartners,
  fetchUsers,
  addPartner,
  setStoreInfo,
  fetchStores,
  fetchUserCategories,
  uploadStoreImage,
  fetchAvailableCities,
  fetchStoresByCity,
  fetchStoreImage,
};
