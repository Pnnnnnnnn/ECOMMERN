import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import { createProduct, getProduct, getProducts, getProductsByCategory } from '../controllers/products.js'

const router = express.Router()

router.post('/', verifyToken, createProduct)
router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/category/:category', getProductsByCategory)

export default router