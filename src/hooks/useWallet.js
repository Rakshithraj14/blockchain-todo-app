import { useState, useEffect, useCallback } from 'react';
import { web3Service } from '../utils/web3';

export const useWallet = () => {
  const [account, setAccount] = useState('');
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const accountAddress = await web3Service.initialize();
      setAccount(accountAddress);
      setConnected(true);
      
      // Set up event listeners
      web3Service.onAccountsChanged((accounts) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnectWallet();
        } else {
          // Account changed
          setAccount(accounts[0]);
        }
      });

      web3Service.onChainChanged(() => {
        // Reload page on chain change
        window.location.reload();
      });

    } catch (err) {
      setError(err.message);
      console.error('Failed to connect wallet:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Disconnect wallet
  const disconnectWallet = useCallback(() => {
    setAccount('');
    setConnected(false);
    setError('');
  }, []);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (web3Service.isConnected()) {
        setAccount(web3Service.getAccount());
        setConnected(true);
      }
    };

    checkConnection();
  }, []);

  return {
    account,
    connected,
    loading,
    error,
    connectWallet,
    disconnectWallet
  };
};
