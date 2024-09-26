import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateProduct = () => {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [rating, setRating] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get token from localStorage
    try {
      await axios.post(
        "http://localhost:4002/api/products/createProduct",
        {
          productId,
          name,
          price,
          featured,
          rating,
          company,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );
      alert("Product created successfully");
    } catch (error) {
      console.error(error);
      alert("Error creating product");
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
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textDecoration: "underline",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Create Product
      </div>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Product ID:
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Product Name:
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Price:
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Featured:
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          style={{ marginLeft: "10px" }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Rating:
        <input
          type="number"
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </label>
      <label style={{ display: "block", marginBottom: "10px" }}>
        Company:
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={{
            display: "block",
            width: "100%",
            padding: "10px",
            margin: "5px 0 10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </label>
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
          marginBottom: "10px",
        }}
      >
        Create Product
      </button>
      <Link
        to="/products"
        style={{
          display: "block",
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#2196F3",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        Product List
      </Link>
    </form>
  );
};

export default CreateProduct;
