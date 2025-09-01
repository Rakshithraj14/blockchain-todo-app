import React from 'react';
import { Wallet, AlertCircle } from 'lucide-react';
import { shortenAddress } from '../utils/web3';

const WalletConnect = ({ 
  connected, 
  account, 
  loading, 
  error, 
  onConnect, 
  onDisconnect,
  taskCount = 0
}) => {
  return (
    <div className="max-w-2xl mx-auto mb-6">
      {!connected ? (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 text-center">
          <Wallet className="mx-auto mb-4 text-white" size={48} />
          <h2 className="text-xl font-semibold text-white mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-gray-300 mb-4">
            Connect to MetaMask to start using the Todo DApp
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}
          
          <button
            onClick={onConnect}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {loading ? 'Connecting...' : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span className="text-white font-medium">Connected</span>
            <span className="text-gray-300">{shortenAddress(account)}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-sm">
              {taskCount === 0 ? 'No tasks yet' : `${taskCount} task${taskCount !== 1 ? 's' : ''}`}
            </span>
            <button
              onClick={onDisconnect}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
