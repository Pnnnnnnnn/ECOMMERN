import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        home: path.resolve(__dirname, 'src/pages/Home.jsx'),
        productList: path.resolve(__dirname, 'src/pages/ProductList.jsx'),
        product: path.resolve(__dirname, 'src/pages/Product.jsx'),
        cart: path.resolve(__dirname, 'src/pages/Cart.jsx'),
      },
    },
  },
});
