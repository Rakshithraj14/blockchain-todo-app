// Smart Contract ABI for Todo DApp
export const CONTRACT_ABI = [
  {
    "inputs": [{"name": "_content", "type": "string"}],
    "name": "createTask",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "toggleCompleted",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "_id", "type": "uint256"}],
    "name": "deleteTask",
    "outputs": [],
    "type": "function"
  },
  {
    "inputs": [{"name": "_user", "type": "address"}],
    "name": "getUserTasks",
    "outputs": [{"name": "", "type": "uint256[]"}],
    "type": "function"
  }
];

// Contract address (replace with actual deployed contract)
export const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890";

// Network configuration
export const NETWORKS = {
  MAINNET: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpcUrl: 'https://mainnet.infura.io/v3/YOUR_PROJECT_ID'
  },
  GOERLI: {
    name: 'Goerli Testnet',
    chainId: 5,
    rpcUrl: 'https://goerli.infura.io/v3/YOUR_PROJECT_ID'
  },
  SEPOLIA: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpcUrl: 'https://sepolia.infura.io/v3/YOUR_PROJECT_ID'
  }
};
