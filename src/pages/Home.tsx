import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  seller: string;
  description?: string;
  condition?: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Load products from localStorage or use default data
    const storedProducts = localStorage.getItem('products');
    const initialProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [
      {
        id: 1,
        title: "Vintage Camera",
        price: "500",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        seller: "John Doe",
        description: "A beautiful vintage camera in excellent condition.",
        condition: "Used - Excellent"
      },
      {
        id: 2,
        title: "Mechanical Keyboard",
        price: "200",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
        seller: "Jane Smith",
        description: "Professional mechanical keyboard with Cherry MX switches.",
        condition: "New"
      },
    ];
    setProducts(initialProducts);
    setFilteredProducts(initialProducts);
  }, []);

  useEffect(() => {
    // Filter products based on search query
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  return (
    <div>
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Decentralized Marketplace
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Buy and sell with HBAR. Secure, transparent, and trustless.
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {product.title}
              </h3>
              <p className="text-gray-600 mb-2">by {product.seller}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600">
                  ℏ {product.price}
                </span>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Home;