const express = require('express')
const router = express.Router()
const { requireAuth } = require('../middleware/user')
const { createFood, uploadImages, fetchPartnerFoods, fetchFoodsByCategory, fetchFood, deleteFood, editFood, fetchSearchFoods } = require('../controllers/foodControllers')
const multer = require('multer')
const upload = multer({storage: multer.diskStorage({})});


router.post('/uploadImages', upload.array('images', 6), uploadImages)
router.post('/createFood', requireAuth, createFood)
router.get('/fetchPartnerFoods', requireAuth, fetchPartnerFoods)
router.get('/fetchFoodsByCategory/:storeName/:category', fetchFoodsByCategory)
router.get('/fetchFood/:foodId', fetchFood)
router.delete('/deleteFood/:foodId', requireAuth, deleteFood)
router.put('/editFood/:foodId', requireAuth, editFood)
router.get('/fetchSearchFoods/:storeName', fetchSearchFoods)



module.exports = router