import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { formatDate } from '../utils/web3';
import TransactionInfo from './TransactionInfo';

const TaskItem = ({ task, onToggle, onDelete, loading }) => {
  return (
    <div
      className={`p-4 rounded-lg border transition-all ${
        task.completed
          ? 'bg-green-500/20 border-green-500/30'
          : 'bg-white/5 border-white/10'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            disabled={loading}
            className="text-white hover:text-green-400 transition-colors disabled:opacity-50"
          >
            {task.completed ? (
              <CheckCircle size={24} className="text-green-400" />
            ) : (
              <Circle size={24} />
            )}
          </button>
          
          <div className="flex-1">
            <p
              className={`font-medium ${
                task.completed
                  ? 'text-gray-300 line-through'
                  : 'text-white'
              }`}
            >
              {task.content}
            </p>
            <p className="text-sm text-gray-400">
              Created {formatDate(task.timestamp)}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          disabled={loading}
          className="text-gray-400 hover:text-red-400 transition-colors p-2 disabled:opacity-50"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
