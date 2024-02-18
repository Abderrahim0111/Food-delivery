const jwt = require('jsonwebtoken');
const Order = require('../models/orderSchema');



const createOrder = async (req, res) => {
    try {
        if(!req.body) return res.json({error: "Invalid informations"})
        const ddd = req.body.forEach(async item => {
            const order = await Order.create({
                client: item.client,
                ownerId: item.ownerId,
                orders: item.orders,
                city: item.city,
                address: item.address,
            })
        });

        res.json({message: "Order created successfully"})
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchClientOrders = async (req, res) => {
    try {
        const finalResponse = []
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT)
        const orders = await Order.find({client: decoded.id}).populate("orders.foodId").populate("ownerId").sort({createdAt: -1})

        if(!orders) return res.json({error: 'fetching error'})
        orders.map((order) => {
            const foods = []
            order.orders.map((food) => {
                foods.push({
                    image: food.foodId.images[0],
                    title: food.foodId.title,
                    quantity: food.quantity,
                    price: food.price
                })
            })
            finalResponse.push({
                id: order._id,
                address: order.address,
                store: order.ownerId.storeName,
                foods: foods
            })
        })
        
        res.json(finalResponse)
    } catch (error) {
        res.json({error: error.message})
    }
}

const fetchPartnerOrders = async (req, res) => {
    try {
        const finalResponse = [];
        const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
        const orders = await Order.find({ ownerId: decoded.id }).populate("orders.foodId").populate("client").sort({createdAt: -1});

        if (!orders) return res.json({ error: 'fetching error' });
        orders.map((order) => {
            const foods = [];
            order.orders.map((food) => {
                // Check if foodId exists and is not null
                if (food.foodId) {
                    foods.push({
                        image: food.foodId.images[0], // Ensure foodId exists before accessing images
                        title: food.foodId.title,
                        quantity: food.quantity,
                        price: food.price
                    });
                }
            });
            finalResponse.push({
                id: order._id,
                address: order.address,
                city: order.city,
                username: order.client.username,
                phone: order.client.phone,
                email: order.client.email,
                foods: foods
            });
        });

        res.json(finalResponse);
    } catch (error) {
        res.json({ error: error.message });
    }
};


const deleteOrder = async (req, res) => {
    try {
        const order = await Order.deleteOne({_id: req.params.orderId})
        if(!order) return res.json({error: 'An error occured when trying to delete this order'})
        res.json({message: 'Order deleted successfully'})
    } catch (error) {
        res.json({error: error.message})
    }
}

module.exports = {
    createOrder,
    fetchClientOrders,
    deleteOrder,
    fetchPartnerOrders
}