const express = require("express");
const { requireAuth } = require("../middleware/user");
const {
  updateProfile,
  fetchUser,
  fetchUsers,
  fetchPartners,
  addPartner,
  setStoreInfo,
  fetchStores,
  fetchUserCategories,
  uploadStoreImage,
  fetchAvailableCities,
  fetchStoresByCity,
  fetchStoreImage
} = require("../controllers/userControllers");
const router = express.Router();
const multer = require('multer')
const upload = multer({storage: multer.diskStorage({})});



router.get("/fetchUser", requireAuth, fetchUser);
router.put("/updateProfile", requireAuth, updateProfile);
router.get("/fetchUsers", requireAuth, fetchUsers);
router.get("/fetchPartners", requireAuth, fetchPartners);
router.put("/addPartner/:userId", requireAuth, addPartner);
router.put("/setStoreInfo", requireAuth, setStoreInfo);
router.get("/fetchStores", fetchStores);
router.get("/fetchStoresByCity/:storeCity", fetchStoresByCity);
router.get("/fetchUserCategories/:storeName", fetchUserCategories);
router.post('/uploadStoreImage', upload.single('storeImage'), uploadStoreImage)
router.get('/fetchAvailableCities', fetchAvailableCities)
router.get('/fetchStoreImage/:storeName', fetchStoreImage)

module.exports = router;
