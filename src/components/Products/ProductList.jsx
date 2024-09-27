import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); // For sorting (price, rating)
  const navigate = useNavigate(); // For navigation

  // Fetch all products or filtered products
  const fetchProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("https://rablo-backend-dq27.onrender.com/api/products/filtered", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          price: priceFilter,
          rating: ratingFilter,
          featured: featuredFilter,
        },
      });
      setProducts(res.data);
      setFilteredProducts(res.data); // Set filtered products initially
    } catch (error) {
      console.error(error);
      alert("Error fetching products");
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://rablo-backend-dq27.onrender.com/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
      setFilteredProducts(updatedProducts); // Update filteredProducts as well
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  const updateProduct = (id) => {
    navigate(`/products/update/${id}`); // Redirect to the update form for the product
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    alert("Logged out successfully");
    navigate("/login"); // Redirect to login page
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleFeaturedFilterChange = (e) => {
    setFeaturedFilter(e.target.value);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchProducts(); // Fetch products with the selected filters
  };

  useEffect(() => {
    let filtered = [...products];

    // Apply featured filter
    if (featuredFilter === "featured") {
      filtered = filtered.filter((product) => product.featured);
    } else if (featuredFilter === "notFeatured") {
      filtered = filtered.filter((product) => !product.featured);
    }

    // Apply sorting
    if (sortOption === "price") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating); // Highest rating first
    }

    setFilteredProducts(filtered);
  }, [products, sortOption, featuredFilter]);

  useEffect(() => {
    fetchProducts(); // Fetch all products initially
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", padding: "20px" }}>
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

      <form onSubmit={handleFilterSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <label>Price less than:</label>
            <input
              type="number"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Rating greater than:</label>
            <input
              type="number"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Featured:</label>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              <option value="">All</option>
              <option value="true">Featured</option>
              <option value="false">Not Featured</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      </form>

      <div style={{ marginBottom: "20px" }}>
        <label>Sort by: </label>
        <select value={sortOption} onChange={handleSortChange} style={{ padding: "5px" }}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="rating">Rating (1-5)</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Product Name</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Price (Rs.)</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Rating</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Company</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Featured</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{product.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{product.rating}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{product.company}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                {product.featured ? "Yes" : "No"}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "10px", textAlign: "center" }}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
