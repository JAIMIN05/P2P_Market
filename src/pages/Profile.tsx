import React from 'react';
import { Package, ShoppingBag, Wallet, Settings } from 'lucide-react';

const Profile = () => {
  const user = {
    name: "John Doe",
    walletAddress: "0x1234...5678",
    balance: "1000",
    listings: 5,
    purchases: 3
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.walletAddress}</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Settings className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-700">HBAR Balance</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">ℏ {user.balance}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Package className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Active Listings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{user.listings}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <ShoppingBag className="h-5 w-5 text-indigo-600" />
              <span className="font-medium text-gray-700">Purchases</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{user.purchases}</p>
          </div>
        </div>
      </div>

      {/* Transactions History */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Product Name #{i}</p>
                <p className="text-sm text-gray-600">Transaction ID: 0x9876...4321</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-indigo-600">ℏ 100</p>
                <p className="text-sm text-gray-600">2 days ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;