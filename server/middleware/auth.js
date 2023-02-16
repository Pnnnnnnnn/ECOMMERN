import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const verifyToken = async (req, res, next)=>{
    if (req.headers.token && req.headers.token.startsWith('Bearer')){
        const token = req.headers.token.split(" ")[1];
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        }catch(err){
            res.status(401).json({"success":false, "msg":"Invalid token"})
        }
    }else{
        res.status(401).json({"success":false, "msg":"Token is missing"})
    }
}
