import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Store, Wallet, UserCircle, PlusCircle } from 'lucide-react';
import WalletModal from './WalletModal';

const Navbar = () => {
  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [walletInfo, setWalletInfo] = useState<{
    connected: boolean;
    accountId: string;
  } | null>(null);

  useEffect(() => {
    const storedWalletInfo = localStorage.getItem('walletInfo');
    if (storedWalletInfo) {
      const info = JSON.parse(storedWalletInfo);
      setWalletInfo({
        connected: info.connected,
        accountId: info.accountId
      });
    }
  }, []);

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
            
            {walletInfo?.connected ? (
              <Link to="/profile" className="flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition">
                <Wallet className="h-5 w-5 text-gray-600" />
                <span>{walletInfo.accountId}</span>
              </Link>
            ) : (
              <button 
                onClick={() => setWalletModalOpen(true)}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
              >
                <Wallet className="h-5 w-5 text-gray-600" />
                <span>Connect Wallet</span>
              </button>
            )}
            
            <Link to="/profile" className="text-gray-600 hover:text-gray-900">
              <UserCircle className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;