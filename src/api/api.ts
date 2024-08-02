import { API_URL } from '../config/config'
import axios from 'axios'
import { List } from '../types/List'
import { Task } from '../types/Task'
import { SetState } from '../types/Utils'

//API for LISTS

export const getLists = async (setLists: SetState<List[]>) => {
  try {
    const response = await axios.get<List[]>(`${API_URL}/lists`);
    setLists(response.data);
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
}

export const getListById = async (id: number, setCurrentList: SetState<List>) => {
  try {
    const response = await axios.get<List>(`${API_URL}/lists/${id}`);
    setCurrentList(response.data);
  } catch (error) {
    console.error(`Error fetching list with ID ${id}:`, error);
  }
};

export const createList = async (list: List, callbackFunction: () => void) => {
  try {
    const response = await axios.post<List>(`${API_URL}/lists`, list);
    callbackFunction();
  } catch (error) {
    console.error(`Error creating list`, error);
  }
};

export const editList = async (id: number, list: List, callbackFunction: () => void) => {
  try {
    const response = await axios.put<List>(`${API_URL}/lists/${id}`, list);
    callbackFunction();
  } catch (error) {
    console.error(`Error creating list`, error);
  }
};

export const deleteList = async (id: number, callbackFunction: () => void) => {
  try {
    const response = await axios.delete(`${API_URL}/lists/${id}`);
    callbackFunction();
  } catch (error) {
    console.error(`Error deleting list`, error);
  }
};

//API for TASKS

export const getTasks = async (listId: number, setTasks: SetState<Task[]>) => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}/lists/${listId}/tasks`);
    setTasks(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

export const getAllTasks = async (setAllTasks: SetState<Task[]>) => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}/tasks`);
    setAllTasks(response.data);
  } catch (error) {
    console.error('Error fetching all tasks:', error);
  }
}

export const getTaskById = async (id: number, setCurrentTask: SetState<Task>) => {
  try {
    const response = await axios.get<Task>(`${API_URL}/tasks/${id}`);
    setCurrentTask(response.data);
  } catch (error) {
    console.error(`Error fetching list with ID ${id}:`, error);
  }
};

export const createTask = async (task: Task, callbackFunction: () => void) => {
  try {
    const response = await axios.post<Task>(`${API_URL}/tasks`, task);
    callbackFunction();
  } catch (error) {
    console.error(`Error creating task`, error);
  }
};

export const editTask = async (id: number, task: Task, callbackFunction: () => void) => {
  try {
    const response = await axios.put<Task>(`${API_URL}/tasks/${id}`, task);
    callbackFunction();
  } catch (error) {
    console.error(`Error editing task`, error);
  }
};

export const deleteTask = async (id: number, listId: number, callbackFunction: () => void) => {
  try {
    const response = await axios.delete(`${API_URL}/lists/${listId}/tasks/${id}`);
    callbackFunction();
  } catch (error) {
    console.error(`Error deleting task`, error);
  }
};