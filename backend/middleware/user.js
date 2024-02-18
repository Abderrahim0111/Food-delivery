const jwt = require("jsonwebtoken")


const requireAuth = async (req, res, next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, process.env.JWT, (err) => {
            if(err){
                res.json({error: "requireAuth"})
            }else{
                next()
            }
        })
    }else{
        res.json({error: "requireAuth"})
    }
}

module.exports = {
    requireAuth,
}