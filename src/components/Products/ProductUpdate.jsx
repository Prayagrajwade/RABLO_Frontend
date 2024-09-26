import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState({
    name: "",
    price: "",
    company: "",
    featured: false,
    rating: 0,
  });

  // Fetch the particular product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const res = await axios.get(
          `https://rablo-backend-dq27.onrender.com/api/products/productByid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add Authorization header
            },
          }
        );
        setProduct(res.data); // Set the specific product's details to the form state
      } catch (error) {
        console.error("Error fetching product", error);
        alert("Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Handle form submission for updating the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Ensure the token is correct
    try {
      await axios.put(`https://rablo-backend-dq27.onrender.com/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`, // Correct Authorization header
        },
      });
      alert("Product updated successfully");
      navigate("/products"); // Redirect to product list
    } catch (error) {
      console.error("Error updating product", error);
      alert("Error updating product");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Update Product</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          name="company"
          value={product.company}
          onChange={handleChange}
          placeholder="Company Name"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          placeholder="Rating (0-5)"
          min="0"
          max="5"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      <div style={{ marginBottom: "15px", display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "10px" }}>Featured:</label>
        <input
          type="checkbox"
          name="featured"
          checked={product.featured}
          onChange={(e) =>
            setProduct({ ...product, featured: e.target.checked })
          }
          style={{
            transform: "scale(1.5)",
            marginRight: "10px",
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Update Product
      </button>
    </form>
  );
};

export default ProductUpdate;
