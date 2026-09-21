import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../contexts/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    const item = { ...product, quantity };
    addToCart(item);
    navigate("/cart");
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-500 text-lg">{error || "Product not found"}</p>
        <Link to="/" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.images?.[0]?.url || "https://via.placeholder.com/500x500?text=No+Image"}
            alt={product.name}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${product.price}
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Category:</span>
              <span className="text-gray-900 capitalize">{product.category}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Brand:</span>
              <span className="text-gray-900">{product.brand}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Stock:</span>
              <span className="text-gray-900">{product.stock} available</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Rating:</span>
              <span className="text-gray-900">
                {product.averageRating} ({product.numReviews} reviews)
              </span>
            </div>
          </div>
          {product.stock > 0 ? (
            <div className="flex gap-3">
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <p className="text-red-500 font-medium">Out of Stock</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;