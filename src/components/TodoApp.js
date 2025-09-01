import React from 'react';
import WalletConnect from './WalletConnect';
import AddTask from './AddTask';
import TaskList from './TaskList';
import ContractInfo from './ContractInfo';
import LoadingOverlay from './LoadingOverlay';
import { useWallet } from '../hooks/useWallet';
import { useTasks } from '../hooks/useTasks';

const TodoApp = () => {
  const { account, connected, loading: walletLoading, error, connectWallet, disconnectWallet } = useWallet();
  const { tasks, loading: tasksLoading, addTask, toggleTask, deleteTask } = useTasks(account);

  const isLoading = walletLoading || tasksLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Blockchain Todo DApp
          </h1>
          <p className="text-gray-300">
            Decentralized task management on Ethereum
          </p>
        </div>

        {/* Wallet Connection */}
        <WalletConnect
          connected={connected}
          account={account}
          loading={walletLoading}
          error={error}
          onConnect={connectWallet}
          onDisconnect={disconnectWallet}
          taskCount={tasks.length}
        />

        {/* Main Content */}
        {connected && (
          <div className="max-w-2xl mx-auto">
            {/* Welcome Message */}
            {tasks.length === 0 && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 text-center">
                <h2 className="text-xl font-semibold text-white mb-2">
                  Welcome to Blockchain Todo! 🎉
                </h2>
                <p className="text-gray-300">
                  You're now connected to the decentralized web. Start building your task list below!
                </p>
              </div>
            )}
            
            {/* Add Task */}
            <AddTask
              onAddTask={addTask}
              loading={isLoading}
              taskCount={tasks.length}
            />

            {/* Task List */}
            <TaskList
              tasks={tasks}
              loading={isLoading}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />

            {/* Contract Info */}
            <ContractInfo />
          </div>
        )}

        {/* Loading Overlay */}
        <LoadingOverlay show={isLoading} />
      </div>
    </div>
  );
};

export default TodoApp;
