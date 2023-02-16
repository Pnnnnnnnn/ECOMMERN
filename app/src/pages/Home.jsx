import React from 'react'
import { Announcement } from '../components/Announcement'
import Navbar from '../components/Navbar'
import { Slider } from '../components/Slider'
import { Categories } from '../components/Categories'
import { Products } from '../components/Products'
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Slider />
      <Categories />
      <Products />
    </div>
  )
}
