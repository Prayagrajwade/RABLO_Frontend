import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreateProduct from './components/Products/CreateProducts';
import ProductList from './components/Products/ProductList';
import ProductUpdate from './components/Products/ProductUpdate';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/update/:id" element={<ProductUpdate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;