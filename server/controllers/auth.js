import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

//@desc   Register user
//@route  POST /api/auth/register
//@access Public
export const register = async (req,res) => {
    if (!req.body.username || !req.body.email || !req.body.password){
        return res.status(400).json("Please fill all the fields")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    try{
        const user = await newUser.save()
        res.status(201).json({"success":true,"data":user})
    }catch(err){
        console.log(err.stack)
        res.status(400).json({"success":false})
    }
}

//@desc     Login user
//@route    POST /api/auth/login
//@access   Public
export const login = async (req,res) => {
    const {username, password} = req.body

    if (!username || !password){
        return res.status(400).json({ "success": false, msg: 'Please provide an username and password'})
    }
    try{
        const user = await User.findOne({username:username})
        if (!user){
            return res.status(400).json({ "success": false, msg:"Invalid username or passsword"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({ "success": false, msg:"Invalid username or password"})
        }

        const token = jwt.sign({"id":user._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_EXPIRE})
        const options = {expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                         httpOnly: true
        }
        res.status(200).cookie('token', token, options).json({"success":true, "token":token})
    }catch(err) {
        console.log(err)
        return res.status(401).json({"success":false})
    }
}

//@decs   Update current Logged in user
//@route  PUT /api/auth/me
//@access Private
export const updateMe = async (req, res)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {"new": true})
        res.status(200).json({"success":true, "msg":"update is completed", "user":updatedUser})
    }catch (err){
        res.status(500).json({"success": false, "msg": 'Server error, unable to update user'})
    }
}