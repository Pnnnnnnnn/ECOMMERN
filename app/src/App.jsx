import { Announcement } from './components/Announcement'
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar'
import { Footer } from './components/Footer'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// pages
import Home from './pages/Home'
import { ProductList } from './pages/ProductList'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'

export default function App() {

  return (
      <BrowserRouter>
        <Toaster position='top-center' />
        <Announcement />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products/category/:category" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  )
}

