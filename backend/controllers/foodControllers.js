const Food = require("../models/foodSchema")
const User = require('../models/userSchema')
const cloudinary = require('cloudinary').v2
const jwt = require('jsonwebtoken')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

const uploadImages = async (req, res) => {
    try {
        if(req.files.length === 0 || req.files.length > 6){
            return res.json({error: "Images must be between 1 and 6"})
        }
        const imagesUrl = req.files.map((file) => {
            return file.path
        })
        res.json(imagesUrl)
    } catch (error) {
        res.json({error: error.message})
    }
}

const createFood = async (req, res) => {
    try {
        const {title, description, price, freeDelivery, images, category} = req.body
        if(!title || !description || !price || !images || !category) return res.json({error: "Incomplete imformations"})
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT)

        const imageUrls = []
        for(const image of images){
            const result = await cloudinary.uploader.upload(image)
            imageUrls.push(result.secure_url)
        }

        const food = await Food.create({
            title: title,
            description: description,
            category: category, 
            price: price,
            freeDelivery: freeDelivery,
            images: imageUrls,
            partner: decoded.id
        })
        const user = await User.findById(decoded.id)
        if(!user.storeCategories.includes(category)){
            const updatedUser = await User.findByIdAndUpdate(decoded.id, {
                $push:{
                    storeCategories: category
                }
            }, {new: true})     
        }
        res.json(food)
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchPartnerFoods = async (req, res) => {
    try {
        const searchTerm = req.query.search || ""
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT)
        const foods = await Food.find({
            title: { $regex: searchTerm, $options: "i" },
            partner: decoded.id
        }).sort({createdAt: -1})
        res.json(foods)
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchFoodsByCategory = async (req, res) => {
    try {
        const partner = await User.findOne({storeName: req.params.storeName})
        const foods = await Food.find({
            category: req.params.category,
            partner: partner._id
        })

        res.json(foods)
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.foodId)
        if(!food) return res.json({error: 'fetching error'})

        res.json(food)
    } catch (error) {
        res.json({error: error.message})
    }
}

const deleteFood = async (req, res) => {
    try {
        const food = await Food.deleteOne({_id: req.params.foodId})
        if(!food) return res.json({error: "An error occured, try again"})
        res.json({message: 'Food deleted successfully'})
    } catch (error) {
        res.json({error: error.message})
    }
}

const editFood = async (req, res) => {
    try {
        const food = await Food.findByIdAndUpdate(req.params.foodId, req.body, {new: true})
        if(!food) return res.json({error: "An error occured, try again"})
        res.json({message: "Food updated successfully"})
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchSearchFoods = async (req, res) => {
    try {
        let searchTerm = req.query.search
        let storeName = req.params.storeName

        const owner = await User.findOne({storeName})

        const foods = await Food.find({
            $or: [
                {title: { $regex: searchTerm, $options: "i" }}, 
                {description: { $regex: searchTerm, $options: "i" }}, 
                {category: { $regex: searchTerm, $options: "i" }}, 
            ],
            partner: owner._id,
        })

        res.json(foods)
        
        
    } catch (error) {
        res.json({error: error.message})
    }
}


module.exports = {
    uploadImages,
    createFood,
    fetchPartnerFoods,
    fetchFoodsByCategory,
    fetchFood,
    deleteFood,
    editFood,
    fetchSearchFoods
}