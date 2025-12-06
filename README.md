# Blockchain Todo DApp

A decentralized todo application built on Ethereum blockchain using React and Web3.js.

## Features

- 🔗 **Blockchain Integration**: Built on Ethereum with smart contract support
- 💼 **Wallet Connection**: MetaMask integration for secure wallet management
- ✅ **Task Management**: Create, complete, and delete tasks
- 🎨 **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 🔒 **Decentralized**: No central server, data stored on blockchain
- 📱 **Responsive**: Works on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── TodoApp.js      
│   ├── WalletConnect.js 
│   ├── AddTask.js      
│   ├── TaskList.js     
│   ├── TaskItem.js     
│   ├── ContractInfo.js 
│   └── LoadingOverlay.js 
├── hooks/              
│   ├── useWallet.js    
│   └── useTasks.js     
├── utils/              
│   └── web3.js         
├── constants/          
│   └── contract.js     
├── App.js              
└── index.js            
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MetaMask browser extension
- Ethereum testnet (Goerli/Sepolia) or mainnet

### Installation

1. Clone the repository:
```bash
git clone 
cd blockchain-todo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Smart Contract

The app is designed to work with a smart contract that handles:
- Creating tasks
- Toggling task completion
- Deleting tasks
- Retrieving user tasks

**Note**: Currently using mock data. To integrate with a real smart contract:
1. Deploy the smart contract to your preferred network
2. Update `CONTRACT_ADDRESS` in `src/constants/contract.js`
3. Replace mock functions in `useTasks.js` with actual contract calls

## Usage

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Add Tasks**: Enter task description and click "Add"
3. **Complete Tasks**: Click the circle icon to mark tasks as complete
4. **Delete Tasks**: Click the trash icon to remove tasks

## Technologies Used

- **Frontend**: React 18, Tailwind CSS
- **Blockchain**: Web3.js, Ethereum
- **Icons**: Lucide React
- **Build Tool**: Create React App

## Configuration

### Networks

Update network configuration in `src/constants/contract.js`:

### Contract Address

Update the contract address in `src/constants/contract.js`:

```javascript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Open an issue on GitHub
- Check the documentation
- Review the smart contract code

---

Built with ⊹ ࣪ ﹏𓊝﹏𓂁﹏⊹ ࣪ ˖

