const jwt = require("jsonwebtoken");
const Order = require("../models/orderSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL,
    pass: process.env.APP_PASS,
  },
});

const sendMail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error.message);
  }
};

const createOrder = async (req, res) => {
  try {
    if (!req.body) return res.json({ error: "Invalid information" });

    for (const item of req.body) {
      const order = await Order.create({
        client: item.client,
        ownerId: item.ownerId,
        orders: item.orders,
        city: item.city,
        address: item.address,
      });

      const orderDetails = await Order.findById(order._id)
        .populate("ownerId", "-password")
        .populate("client", "-password");
      const mailOptions = {
        from: {
          name: "TastyRush",
          address: process.env.MAIL,
        },
        to: orderDetails.ownerId.email,
        subject: "New order in TastyRush.",
        text: `Congrats! You have a new order from ${orderDetails.client.username}`,
        html: `<b>Congrats! You have a new order from ${orderDetails.client.username}</b>`,
      };
      await sendMail(transporter, mailOptions);
    }

    res.json({ message: "Order created successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchClientOrders = async (req, res) => {
  try {
    const finalResponse = [];
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
    const orders = await Order.find({ client: decoded.id })
      .populate("orders.foodId")
      .populate("ownerId")
      .sort({ createdAt: -1 });

    if (!orders) return res.json({ error: "fetching error" });
    orders.map((order) => {
      const foods = [];
      order.orders.map((food) => {
        if (food.foodId) {
          foods.push({
            image: food.foodId.images[0],
            title: food.foodId.title,
            quantity: food.quantity,
            price: food.price,
          });
        }
      });

      finalResponse.push({
        id: order._id,
        address: order.address,
        store: order.ownerId.storeName,
        foods: foods,
      });
    });

    res.json(finalResponse);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const fetchPartnerOrders = async (req, res) => {
  try {
    const finalResponse = [];
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT);
    const orders = await Order.find({ ownerId: decoded.id })
      .populate("orders.foodId")
      .populate("client")
      .sort({ createdAt: -1 });

    if (!orders) return res.json({ error: "fetching error" });
    orders.map((order) => {
      const foods = [];
      order.orders.map((food) => {
        if (food.foodId) {
          foods.push({
            image: food.foodId.images[0],
            title: food.foodId.title,
            quantity: food.quantity,
            price: food.price,
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
        foods: foods,
        createdAt: order.createdAt,
      });
    });

    res.json(finalResponse);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.deleteOne({ _id: req.params.orderId });
    if (!order)
      return res.json({
        error: "An error occured when trying to delete this order",
      });
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const portfolio = async (req, res) => {
  if (!req.body.email || !req.body.subject || !req.body.message)
    return res.json({ error: "All fields are required" });
  try {
    const mailOptions = {
      from: {
        name: "Portfolio",
        address: process.env.MAIL,
      },
      to: process.env.MAIL,
      subject: req.body.subject,
      text: `Congrats! You have a new email from ${req.body.email}. \n\nMessage: ${req.body.message}`,
      html: `<p><strong>Congrats! You have a new email from:</strong> ${req.body.email}</p><p><strong>Message:</strong></p><p>${req.body.message}</p>`,
    };
    await sendMail(transporter, mailOptions);
    res.json({ message: "Thanks for your message!" });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  createOrder,
  fetchClientOrders,
  deleteOrder,
  fetchPartnerOrders,
  portfolio,
};
