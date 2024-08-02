import React, { useState, useEffect, createContext } from 'react'
import { getAllTasks, getListById, getLists, getTasks } from './api/api'
import { List } from './types/List'
import { Task } from './types/Task';
import { Sidebar } from './components/Sidebar';
import { TasksWrapper } from './components/TasksWrapper';
import { defaultStore } from './config/default';
import { Store, StoreState } from './types/Store';
import './styles/index.scss'

export const Context = createContext<StoreState | undefined>(undefined);

export function App() {

  const [store, setStore] = useState<Store>(defaultStore);
  const [lists, setLists] = useState<List[]>([]);
  const [currentList, setCurrentList] = useState<List | undefined>(undefined);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const fetchAll = () => {
    getLists(setLists);
    setTasks([]);
    fetchTasks();
    getAllTasks(setAllTasks);
  }

  const fetchTasks = () => {
    if (currentList != undefined && currentList.id != undefined) {
      getTasks(currentList.id, setTasks);
    }
  }

  useEffect(() => {
    fetchAll();
  }, [currentList])

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setStore({
        ...store,
        darkMode: JSON.parse(storedDarkMode)
      })
    }
    const storedcurrentListId = localStorage.getItem('currentListId');
    if (storedcurrentListId !== null && storedcurrentListId !== '') {
      const currentListId = JSON.parse(storedcurrentListId);
      getListById(currentListId, setCurrentList)
    }
  }, []);

  return (
    <Context.Provider value={{ store, setStore }}>
      <div className={`App ${store.darkMode ? 'dark' : ''}`} >
        <div className="main-wrapper h-100 d-flex overflow-hidden">
          <Sidebar
            lists={lists}
            currentList={currentList}
            setCurrentList={setCurrentList}
            fetchAll={fetchAll}
            allTasks={allTasks}
          />
          <TasksWrapper
            tasks={tasks}
            currentList={currentList}
            fetchAll={fetchAll}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>
    </Context.Provider>
  );
}