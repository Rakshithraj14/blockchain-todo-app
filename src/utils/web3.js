import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../constants/contract';

// Web3 utility functions
export class Web3Service {
  constructor() {
    this.web3 = null;
    this.contract = null;
    this.account = null;
  }

  // Initialize Web3 and contract
  async initialize() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        this.account = accounts[0];
        
        // Dynamically import Web3 to avoid SSR issues
        const Web3 = (await import('web3')).default;
        
        // Create Web3 instance
        this.web3 = new Web3(window.ethereum);
        
        // Create contract instance
        this.contract = new this.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        
        return this.account;
      } catch (error) {
        console.error('Failed to initialize Web3:', error);
        throw error;
      }
    } else {
      throw new Error('MetaMask is not installed');
    }
  }

  // Get current account
  getAccount() {
    return this.account;
  }

  // Check if wallet is connected
  isConnected() {
    return !!this.account;
  }

  // Listen for account changes
  onAccountsChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  // Listen for chain changes
  onChainChanged(callback) {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback);
    }
  }

  // Get network ID
  async getNetworkId() {
    if (this.web3) {
      return await this.web3.eth.net.getId();
    }
    return null;
  }

  // Get balance
  async getBalance(address) {
    if (this.web3) {
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, 'ether');
    }
    return '0';
  }

  // Get contract instance
  getContract() {
    return this.contract;
  }

  // Get Web3 instance
  getWeb3() {
    return this.web3;
  }
}

// Create a singleton instance
export const web3Service = new Web3Service();

// Utility function to shorten Ethereum addresses
export const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Utility function to format timestamps
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

// Utility function to validate Ethereum address
export const isValidAddress = (address) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};
