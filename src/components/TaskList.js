import React from 'react';
import { AlertCircle } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onToggle, onDelete }) => {
  if (loading && tasks.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>
              <div className="text-center py-8">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-white/10 rounded-full mx-auto mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-white/10 rounded w-32 mx-auto"></div>
            <div className="h-3 bg-white/5 rounded w-24 mx-auto"></div>
          </div>
        </div>
        <p className="text-gray-300 mt-4">Setting up your blockchain connection...</p>
      </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>
        <div className="text-center py-8">
          <div className="mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl text-gray-400">✨</span>
            </div>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Ready to get organized?</h3>
          <p className="text-gray-300 mb-4">Start by adding your first task above</p>
          <div className="text-xs text-gray-400">
            Your tasks will be stored securely on the blockchain
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">Your Tasks</h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
