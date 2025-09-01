// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoContract {
    struct Task {
        uint256 id;
        string content;
        bool completed;
        uint256 timestamp;
        address owner;
    }
    
    mapping(address => Task[]) private userTasks;
    mapping(uint256 => address) private taskOwners;
    uint256 private taskCounter;
    
    event TaskCreated(uint256 indexed id, address indexed owner, string content, uint256 timestamp);
    event TaskToggled(uint256 indexed id, bool completed);
    event TaskDeleted(uint256 indexed id, address indexed owner);
    
    modifier onlyTaskOwner(uint256 _taskId) {
        require(taskOwners[_taskId] == msg.sender, "Only task owner can perform this action");
        _;
    }
    
    modifier taskExists(uint256 _taskId) {
        require(taskOwners[_taskId] != address(0), "Task does not exist");
        _;
    }
    
    function createTask(string memory _content) public {
        require(bytes(_content).length > 0, "Task content cannot be empty");
        
        taskCounter++;
        Task memory newTask = Task({
            id: taskCounter,
            content: _content,
            completed: false,
            timestamp: block.timestamp,
            owner: msg.sender
        });
        
        userTasks[msg.sender].push(newTask);
        taskOwners[taskCounter] = msg.sender;
        
        emit TaskCreated(taskCounter, msg.sender, _content, block.timestamp);
    }
    
    function toggleCompleted(uint256 _taskId) public onlyTaskOwner(_taskId) taskExists(_taskId) {
        Task[] storage tasks = userTasks[msg.sender];
        
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _taskId) {
                tasks[i].completed = !tasks[i].completed;
                emit TaskToggled(_taskId, tasks[i].completed);
                break;
            }
        }
    }
    
    function deleteTask(uint256 _taskId) public onlyTaskOwner(_taskId) taskExists(_taskId) {
        Task[] storage tasks = userTasks[msg.sender];
        
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _taskId) {
                // Remove task by replacing with last element and popping
                tasks[i] = tasks[tasks.length - 1];
                tasks.pop();
                delete taskOwners[_taskId];
                
                emit TaskDeleted(_taskId, msg.sender);
                break;
            }
        }
    }
    
    function getUserTasks(address _user) public view returns (Task[] memory) {
        return userTasks[_user];
    }
    
    function getTaskCount() public view returns (uint256) {
        return taskCounter;
    }
    
    function getTask(uint256 _taskId) public view returns (Task memory) {
        require(taskOwners[_taskId] != address(0), "Task does not exist");
        
        address owner = taskOwners[_taskId];
        Task[] memory tasks = userTasks[owner];
        
        for (uint i = 0; i < tasks.length; i++) {
            if (tasks[i].id == _taskId) {
                return tasks[i];
            }
        }
        
        revert("Task not found");
    }
}
