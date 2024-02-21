import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    try {
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        console.log('Retrieved tasks from localStorage:', storedTasks);
        if (storedTasks) {
          setTasks(storedTasks);
        }
      } catch (error) {
        console.error('Error retrieving tasks from localStorage:', error);
      }
    } , []);

  useEffect(() => {
    try {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Saved tasks to localStorage:', tasks);
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), name: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTaskName = (id, newName) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, name: newName } : task
    ));
  };

  return (
    <div className="App">
        <div className="myTodo">
      <h1>To-Do List</h1>
      <div className="tasks-container">
        <input
          type="text"
          placeholder="Add a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              <input
                type="text"
                value={task.name}
                onChange={(e) => editTaskName(task.id, e.target.value)}
                onBlur={() => editTaskName(task.id, task.name)}
                readOnly={task.completed}
              />
              <button onClick={() => deleteTask(task.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
              <button onClick={() => editTaskName(task.id, task.name)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
};

export default TodoList;

