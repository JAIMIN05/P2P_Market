import React, { useState, useEffect } from "react";
import { HashConnect, HashConnectTypes } from "hashconnect";

const APP_METADATA = {
  name: "My Hedera Dapp",
  description: "A decentralized application on Hedera",
  icon: "https://www.example.com/icon.png", // Replace with your icon URL
};

const WalletConnect = () => {
  const [hashConnect, setHashConnect] = useState<HashConnect | null>(null);
  const [pairedWallet, setPairedWallet] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    initHashConnect();
  }, []);

  const initHashConnect = async () => {
    const hashconnect = new HashConnect();

    // Store the instance in state
    setHashConnect(hashconnect);

    // Ledger ID: Use "mainnet" for production
    const ledgerId= "testnet";

    // Initialize HashConnect
    const initData = await hashconnect.init(APP_METADATA, ledgerId, true);

    // If a pairing already exists, set it
    hashconnect.pairingEvent.on((pairingData) => {
      if (pairingData.accountIds.length > 0) {
        setPairedWallet(pairingData.accountIds[0]);
        setIsConnected(true);
      }
    });

    // Attempt auto-reconnect if previously paired
    if (initData.pairingData.length > 0) {
      setPairedWallet(initData.pairingData[0].accountIds[0]);
      setIsConnected(true);
    }
  };

  const connectWallet = async () => {
    if (!hashConnect) return;

    // Generate a pairing code and connect to HashPack
    const topic = await hashConnect.connectToLocalWallet();
    console.log("Pairing topic:", topic);
  };

  const disconnectWallet = () => {
    setPairedWallet(null);
    setIsConnected(false);
    hashConnect?.disconnect();
  };

  return (
    <div className="wallet-container">
      <h2>Connect to HashPack Wallet</h2>
      {isConnected ? (
        <div>
          <p>Connected Wallet: {pairedWallet}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect HashPack</button>
      )}
    </div>
  );
};

export default WalletConnect;
