import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface WalletInfo {
  accountId: string;
  userName: string;
  connected: boolean;
  balance: string;
  email: string;
}

const Profile: React.FC = () => {
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWalletInfo = localStorage.getItem("walletInfo");
    if (!storedWalletInfo) {
      navigate("/");
      return;
    }
    setWalletInfo(JSON.parse(storedWalletInfo));
  }, [navigate]);

  if (!walletInfo) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-6">
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl">
              {walletInfo.userName.charAt(0)}
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{walletInfo.userName}</h2>
            <p className="text-gray-600">Account ID: {walletInfo.accountId}</p>
            <p className="text-gray-600">Email: {walletInfo.email}</p>
            <p className="text-gray-600">Balance: {walletInfo.balance}</p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("walletInfo");
              navigate("/");
            }}
            className="mt-6 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;