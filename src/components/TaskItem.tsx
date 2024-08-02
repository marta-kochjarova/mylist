import React, { FC, useState } from 'react';
import { Dropdown, Form } from "react-bootstrap";
import { Task } from '../types/Task';
import { deleteTask, editTask } from '../api/api';
import { CreateEditFormData } from '../types/Utils';
import { CreateEditForm } from './CreateEditForm';

interface TaskProps {
     task: Task;
     fetchAll: () => void;
     fetchTasks: () => void;
}

export const TaskItem: FC<TaskProps> = ({task, fetchAll, fetchTasks}) => {

     const [activeEditTask, setActiveEditTask] = useState<number | undefined>(undefined);

     const handleEditToggle = (id?: number) => {
          setActiveEditTask(id);
     }

     const submitEditTask = (formData: CreateEditFormData) => {
          if (formData.id != undefined && formData.parentId != undefined) {
               const newTask: Task = {
                    id: formData.id,
                    listId: formData.parentId,
                    name: formData.name,
                    status: formData.status ?? false,
               }

               editTask(formData.id, newTask, () => {
                    fetchAll();
                    setActiveEditTask(undefined);
               });
          } else {
               alert('Error: Task ID or List ID is missing.');
          }
     }

     const handleCheck = (task: Task) => {
          if (task.id != undefined) {
               const newTask: Task = { ...task, status: !task.status };
               editTask(task.id, newTask, fetchTasks);
          } else {
               alert('Error: Task ID is missing.');
          }
     }

     const handleDelete = (taskId?: number, listId?: number) => {
          if (taskId != undefined && listId != undefined) {
               deleteTask(taskId, listId, fetchAll);
          } else {
               alert('Error: Task ID is missing.');
          }
     }

     return (
          <li className={`task-row border-bottom ${task.status ? 'checked' : 'false'}`}>
               <Form>
                    <Form.Check.Input
                         type="checkbox"
                         id={`${task.id}`}
                         checked={task.status}
                         onChange={() => handleCheck(task)}
                         className='task-checkbox'
                    />
               </Form>
               {activeEditTask === task.id ? (
                    <CreateEditForm
                         submitFunction={submitEditTask}
                         existingData={{ ...task, parentId: task.listId }}
                         entity={"task"}
                    />
               ) : (
                    <span className='flex-grow-1'>{task.name}</span>
               )}
               <Dropdown>
                    <Dropdown.Toggle variant="link" size="sm" id={`task-options-${task.id}`} />
                    <Dropdown.Menu>
                         <Dropdown.Item onClick={() => handleEditToggle(task.id)}>Edit</Dropdown.Item>
                         <Dropdown.Item onClick={() => handleDelete(task.id, task.listId)}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
               </Dropdown>
          </li>
     );
};