import React, { useState } from "react";
import { X, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define wallet profiles
type WalletProfiles = {
  [key: string]: {
    userName: string;
    balance: string;
    email: string;
  };
};

const WALLET_PROFILES: WalletProfiles = {
  "0.0.5664999": {
    userName: "Jaimin Kaneriya",
    balance: "1000 HBAR",
    email: "jaiminkaneriya@gmail.com"
  },
  "0.0.5664975": {
    userName: "Jay",
    balance: "200 HBAR",
    email: "jay@gmail.com"
  },
  "0.0.5664977": {
    userName: "Prathm",
    balance: "500 HBAR",
    email: "prathm@gmail.com"
  }
};

const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [accountId, setAccountId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleConnect = () => {
    const profile = WALLET_PROFILES[accountId];
    
    if (profile) {
      localStorage.setItem(
        "walletInfo",
        JSON.stringify({
          accountId: accountId,
          userName: profile.userName,
          connected: true,
          balance: profile.balance,
          email: profile.email,
        })
      );
      
      onClose();
      navigate("/profile");
    } else {
      setError("Invalid account ID. Please try again.");
    }
  };

  const handleShowAddressInput = () => {
    setShowAddressInput(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Connect Wallet</h2>
        
        <div className="space-y-4">
          {!showAddressInput ? (
            <button
              onClick={handleShowAddressInput}
              className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              <Wallet className="h-5 w-5" />
              <span>Connect with HashPack</span>
            </button>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hedera Account ID
                </label>
                <input
                  type="text"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Enter your Hedera account ID"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Try: 0.0.5664999 or 0.0.5664975
                </p>
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                onClick={handleConnect}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Connect Wallet
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;