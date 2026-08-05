import { useState, useEffect } from 'react'
import type { Task }  from './ManagingTasks';

export default function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const savedTasks = localStorage.getItem('stored_tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Failed to load tasks from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('stored_tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  }, [tasks]);

  return { tasks, setTasks };
}
