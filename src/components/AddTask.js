import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTask = ({ onAddTask, loading, taskCount }) => {
  const [newTask, setNewTask] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    try {
      await onAddTask(newTask);
      setNewTask('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Add New Task</h2>
        <span className="text-gray-300 text-sm">
          {taskCount === 0 ? 'No tasks yet' : `${taskCount} task${taskCount !== 1 ? 's' : ''}`}
        </span>
      </div>
      
                  <form onSubmit={handleSubmit} className="flex space-x-3">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task description..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !newTask.trim()}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <Plus size={20} />
                <span>{loading ? 'Adding...' : 'Add'}</span>
              </button>
            </form>
            
            {showSuccess && (
              <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center space-x-2 text-green-400">
                  <span>✅</span>
                  <span className="text-sm">Task added successfully!</span>
                </div>
              </div>
            )}
    </div>
  );
};

export default AddTask;
