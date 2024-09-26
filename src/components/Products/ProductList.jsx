import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // For navigation

  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("https://rablo-backend-dq27.onrender.com/api/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://rablo-backend-dq27.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  // Function to navigate to the update form
  const updateProduct = (id) => {
    navigate(`/products/update/${id}`); // Redirect to the update form for the product
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Product List</h2>
      <button
        onClick={handleLogout}
        style={{
          float: "right",
          backgroundColor: "transparent",
          border: "none",
          color: "red",
          cursor: "pointer",
          fontSize: "16px",
          marginBottom: "10px",
        }}
      >
        Logout
      </button>
      <Link
        to="/products/create"
        style={{
          display: "block",
          textAlign: "center",
          margin: "10px 0",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        CREATE PRODUCT
      </Link>
      <ul
        style={{
          listStyle: "none",
          padding: "0",
          margin: "0",
          borderTop: "1px solid #ddd",
        }}
      >
        {products.map((product) => (
          <li
            key={product._id}
            style={{
              padding: "15px",
              borderBottom: "1px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {product.name} - Rs.{product.price} -{" "}
              {product.featured ? "Featured" : "Not Featured"} -{" "}
              {product.company} - {product.rating}
            </span>
            <div>
              <button
                onClick={() => updateProduct(product._id)}
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
              <button
                onClick={() => deleteProduct(product._id)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
