import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Wallet, UserCircle, PlusCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">P2P Market</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/list-product"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <PlusCircle className="h-5 w-5" />
              <span>List Product</span>
            </Link>
            
            <button className="flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
              <Wallet className="h-5 w-5 text-gray-600" />
              <span>Connect Wallet</span>
            </button>
            
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;