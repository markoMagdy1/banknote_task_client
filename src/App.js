import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navbar/navbar';
import Products from './components/pages/products/products';
import AllProducts from './components/dashboard/all_products';
import NewProduct from './components/dashboard/new_product';
import { PublicProvider } from './context/public-context';
import UpdateProduct from './components/dashboard/update_product';

function App() {
  return (
    <PublicProvider>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/dashboard" element={<AllProducts />} />
          <Route exact path="/newProduct" element={<NewProduct />} />
          <Route exact path="/dashboard/products/:id" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
    </PublicProvider>
  );
}

export default App;
