const express = require("express")
const app = express()
app.use(express.json())

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT

const cors = require('cors')
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err)
})


const authRouter = require('./routes/authRoutes')
app.use('/api', authRouter)

const userRourer = require('./routes/userRouts')
app.use('/api', userRourer)

const foodRouter = require('./routes/foodRoutes')
app.use('/api', foodRouter)

const orderRouter = require('./routes/orderRoutes')
app.use('/api', orderRouter)
