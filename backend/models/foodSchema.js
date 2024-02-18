const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    freeDelivery: Boolean,
    category: String,
    images: [String],
    partner: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
})

const Food = mongoose.model("Food", foodSchema)
module.exports = Food