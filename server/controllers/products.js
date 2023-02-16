import Product from '../models/Product.js'

//@decs   Create prooducts
//@route  POST /api/products
//@access Private
export const createProduct = async (req,res)=>{
    if (req.user.isAdmin){
        try{
            const product = await Product.create(req.body)
            res.status(201).json({"success":true,"msg":"Product is created","data":product})
        }catch(err){
            console.log(err.stack)
            res.status(400).json({"success":false})
        }
    }else{
        res.status(403).json({"success":false, "msg":`You are not authorized to access this route`})
    }
}

//@desc   Get products
//@route  GET /api/products
//@access Public
export const getProducts = async (req, res) =>{
    try{
        const products = await Product.find()
        res.status(200).json({"success":true, "data":products})
    }catch(err){
        console.log(err.stack)
        res.status(400).json({"success":false})
    }
}

//@desc   Get products by category
//@route  GET /api/products/category/:category
//@access Public
export const getProductsByCategory = async (req, res) =>{
    try{
        const products = await Product.find({"category":req.params.category})
        res.status(200).json({"success":true, "data":products})
    }catch(err){
        console.log(err.stack)
        res.status(400).json({"success":false})
    }
}

//@desc   Get single product
//@route  GET /api/products/:id
//@access Public
export const getProduct = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({"success":true, "data":product})
    }catch(err){
        console.log(err.stack)
        res.status(400).json({"success":false})
    }
}