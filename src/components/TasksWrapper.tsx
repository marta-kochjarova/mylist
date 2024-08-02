import React, { FC, useContext } from "react"
import { createTask, editTask } from "../api/api";
import { Task } from "../types/Task"
import { List } from "../types/List";
import { CreateEditForm } from "./CreateEditForm";
import { defaultCreateEditFormData, defaultTask } from "../config/default";
import { CreateEditFormData } from "../types/Utils";
import { TaskItem } from "./TaskItem";
import { SidebarToggler } from "./SidebarToggler";
import { EmptyMessage } from "./EmptyMessage";

interface TasksWrapper {
     tasks: Task[];
     currentList: List | undefined;
     fetchAll: () => void;
     fetchTasks: () => void;
}

export const TasksWrapper: FC<TasksWrapper> = ({ tasks, currentList, fetchAll, fetchTasks }) => {

     const submitCreateTask = (formData: CreateEditFormData) => {
          if (formData.parentId != undefined) {
               const newTask: Task = {
                    ...defaultTask,
                    name: formData.name,
                    listId: formData.parentId,
               }
               createTask(newTask, fetchAll);
          } else {
               alert('Error: List ID is missing.');
          }
     }

     return (
          <section id="main-content" className="secondary-bg d-flex flex-column flex-grow-1 overflow-y-scroll border-right light-grey-bg">
               <header className="w-100 d-flex align-items-center">
                    <SidebarToggler showOnDevice={'all'} />
                    <span className="header-title text-primary-color mb-0">{currentList != undefined ? currentList.name : ''}</span>
               </header>
               {currentList != undefined && currentList.id != undefined
                    ?
                    <>
                    <div className="taskInput pt-3">
                         <CreateEditForm
                              submitFunction={submitCreateTask}
                              existingData={{ ...defaultCreateEditFormData, parentId: currentList.id }}
                              entity={"task"}
                         />
                    </div>
                    {tasks.length > 0
                         ? <div className="border-all primary-bg border-radius mt-3">
                              <ul className="px-3 py-3 mb-0">
                                   {tasks.map(task => (
                                        <TaskItem
                                             key={task.id}
                                             task={task}
                                             fetchAll={fetchAll}
                                             fetchTasks={fetchTasks}
                                        />
                                   ))}
                              </ul>
                         </div>
                         : 
                         <EmptyMessage message="There are no tasks in this list yet." />
                    }
                    </>
                    :
                    <EmptyMessage message="Select or create a new list before adding tasks." />
               }
               
          </section>
     )
}