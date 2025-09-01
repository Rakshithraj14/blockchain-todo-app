import React, { useState } from 'react';
import { Copy, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const TransactionInfo = ({ task, pendingTransactions }) => {
  const [copied, setCopied] = useState(false);
  const isPending = pendingTransactions.has(task.id);
  const pendingType = pendingTransactions.get(task.id);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusIcon = () => {
    if (isPending) {
      return <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />;
    }
    if (task.status === 'confirmed') {
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
    return <AlertCircle className="w-4 h-4 text-red-400" />;
  };

  const getStatusText = () => {
    if (isPending) {
      return `Pending ${pendingType}...`;
    }
    if (task.status === 'confirmed') {
      return 'Confirmed';
    }
    return 'Failed';
  };

  const getStatusColor = () => {
    if (isPending) return 'text-yellow-400';
    if (task.status === 'confirmed') return 'text-green-400';
    return 'text-red-400';
  };

  if (!task.txHash && !isPending) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-white/5 border border-white/10 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`text-sm font-medium ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
        
        {task.gasUsed && (
          <span className="text-xs text-gray-400">
            Gas: {task.gasUsed}
          </span>
        )}
      </div>

      {task.txHash && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">Transaction Hash:</span>
            <button
              onClick={() => copyToClipboard(task.txHash)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <code className="text-xs text-gray-300 bg-black/20 px-2 py-1 rounded flex-1 font-mono">
              {task.txHash}
            </code>
            
            <a
              href={`https://etherscan.io/tx/${task.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {task.blockNumber && (
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Block: {task.blockNumber}</span>
          {task.timestamp && (
            <span>{new Date(task.timestamp).toLocaleString()}</span>
          )}
        </div>
      )}

      {isPending && (
        <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
          <div className="flex items-center space-x-2 text-yellow-400">
            <div className="animate-spin rounded-full h-3 w-3 border-b border-yellow-400"></div>
            <span className="text-xs">
              {pendingType === 'add' && 'Creating task on blockchain...'}
              {pendingType === 'toggle' && 'Updating task completion...'}
              {pendingType === 'delete' && 'Deleting task from blockchain...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionInfo;
