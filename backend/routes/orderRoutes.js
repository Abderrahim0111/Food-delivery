const express = require('express')
const { requireAuth } = require('../middleware/user')
const { createOrder, fetchClientOrders, deleteOrder, fetchPartnerOrders } = require('../controllers/orderControllers')
const router = express.Router()


router.post('/createOrder', requireAuth, createOrder)
router.get('/fetchClientOrders', requireAuth, fetchClientOrders)
router.get('/fetchPartnerOrders', requireAuth, fetchPartnerOrders)
router.delete('/deleteOrder/:orderId',requireAuth, deleteOrder)



module.exports = router