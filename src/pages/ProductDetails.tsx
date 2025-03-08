import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Package, Clock, User } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  seller: string;
  description: string;
  condition: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Load products from localStorage
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products: Product[] = JSON.parse(storedProducts);
      const foundProduct = products.find(p => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/'); // Redirect if product not found
      }
    }
  }, [id, navigate]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-gray-500" />
            <span className="text-gray-600">Listed by {product.seller}</span>
          </div>

          <div className="text-3xl font-bold text-indigo-600 mb-6">
            ℏ {product.price}
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">{product.condition}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">Listed recently</span>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition mb-4">
            Buy Now with HBAR
          </button>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-gray-600">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Protected by Smart Contract Escrow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;