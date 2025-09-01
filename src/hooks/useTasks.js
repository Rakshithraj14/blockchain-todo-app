import { useState, useEffect, useCallback } from 'react';
import { web3Service } from '../utils/web3';

export const useTasks = (account) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingTransactions, setPendingTransactions] = useState(new Map());

  // Load tasks for a user from blockchain
  const loadTasks = useCallback(async (userAddress) => {
    if (!userAddress) return;
    
    setLoading(true);
    setError('');
    
    try {
      const contract = web3Service.getContract();
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      // Get user tasks from smart contract
      const userTasks = await contract.methods.getUserTasks(userAddress).call();
      
      // Fetch individual task details
      const taskPromises = userTasks.map(async (taskId) => {
        try {
          const task = await contract.methods.getTask(taskId).call();
          return {
            id: parseInt(task.id),
            content: task.content,
            completed: task.completed,
            timestamp: parseInt(task.timestamp) * 1000, // Convert to milliseconds
            owner: task.owner,
            txHash: null, // Will be updated when we track transactions
            blockNumber: null,
            gasUsed: null,
            status: 'confirmed'
          };
        } catch (err) {
          console.error(`Failed to fetch task ${taskId}:`, err);
          return null;
        }
      });

      const fetchedTasks = await Promise.all(taskPromises);
      const validTasks = fetchedTasks.filter(task => task !== null);
      
      setTasks(validTasks);
      setLoading(false);
    } catch (err) {
      setError('Failed to load tasks from blockchain');
      setLoading(false);
      console.error('Failed to load tasks:', err);
    }
  }, []);

  // Add new task to blockchain
  const addTask = useCallback(async (content) => {
    if (!content.trim() || !account) return;
    
    setLoading(true);
    setError('');
    
    try {
      const contract = web3Service.getContract();
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      // Create temporary task object for immediate UI feedback
      const tempTaskId = Date.now();
      const tempTask = {
        id: tempTaskId,
        content: content.trim(),
        completed: false,
        timestamp: Date.now(),
        owner: account,
        txHash: null,
        blockNumber: null,
        gasUsed: null,
        status: 'pending'
      };

      // Add to pending transactions
      setPendingTransactions(prev => new Map(prev.set(tempTaskId, 'add')));

      // Add temporary task to UI
      setTasks(prevTasks => [...prevTasks, tempTask]);

      // Send transaction to blockchain
      const tx = await contract.methods.createTask(content.trim()).send({ 
        from: account,
        gas: 200000 // Estimate gas limit
      });

      // Update task with blockchain data
      const confirmedTask = {
        ...tempTask,
        id: parseInt(tx.events.TaskCreated.returnValues.id),
        txHash: tx.transactionHash,
        blockNumber: tx.blockNumber,
        gasUsed: tx.gasUsed,
        status: 'confirmed'
      };

      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(tempTaskId);
        return newMap;
      });

      // Update task in list
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === tempTaskId ? confirmedTask : task
        )
      );

      setLoading(false);
      return confirmedTask;
    } catch (err) {
      // Remove failed task from UI
      setTasks(prevTasks => prevTasks.filter(task => task.id !== Date.now()));
      
      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(Date.now());
        return newMap;
      });

      setError('Failed to add task to blockchain');
      setLoading(false);
      console.error('Failed to add task:', err);
      throw err;
    }
  }, [account]);

  // Toggle task completion on blockchain
  const toggleTask = useCallback(async (taskId) => {
    setLoading(true);
    setError('');
    
    try {
      const contract = web3Service.getContract();
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      // Add to pending transactions
      setPendingTransactions(prev => new Map(prev.set(taskId, 'toggle')));

      // Optimistically update UI
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'pending' }
            : task
        )
      );

      // Send transaction to blockchain
      const tx = await contract.methods.toggleCompleted(taskId).send({ 
        from: account,
        gas: 100000
      });

      // Update task with new completion status and transaction data
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { 
                ...task, 
                completed: !task.completed,
                txHash: tx.transactionHash,
                blockNumber: tx.blockNumber,
                gasUsed: tx.gasUsed,
                status: 'confirmed'
              }
            : task
        )
      );

      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });

      setLoading(false);
    } catch (err) {
      // Revert optimistic update
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'confirmed' }
            : task
        )
      );

      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });

      setError('Failed to toggle task on blockchain');
      setLoading(false);
      console.error('Failed to toggle task:', err);
      throw err;
    }
  }, [account]);

  // Delete task from blockchain
  const deleteTask = useCallback(async (taskId) => {
    setLoading(true);
    setError('');
    
    try {
      const contract = web3Service.getContract();
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      // Add to pending transactions
      setPendingTransactions(prev => new Map(prev.set(taskId, 'delete')));

      // Optimistically remove from UI
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'pending' }
            : task
        )
      );

      // Send transaction to blockchain
      const tx = await contract.methods.deleteTask(taskId).send({ 
        from: account,
        gas: 100000
      });

      // Remove task from list
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));

      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });

      setLoading(false);
    } catch (err) {
      // Revert optimistic update
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.id === taskId 
            ? { ...task, status: 'confirmed' }
            : task
        )
      );

      // Remove from pending transactions
      setPendingTransactions(prev => {
        const newMap = new Map(prev);
        newMap.delete(taskId);
        return newMap;
      });

      setError('Failed to delete task from blockchain');
      setLoading(false);
      console.error('Failed to delete task:', err);
      throw err;
    }
  }, [account]);

  // Load tasks when account changes
  useEffect(() => {
    if (account) {
      loadTasks(account);
    } else {
      setTasks([]);
      setPendingTransactions(new Map());
    }
  }, [account, loadTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    loadTasks,
    pendingTransactions
  };
};
