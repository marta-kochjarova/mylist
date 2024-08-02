import React, { FC, useContext, useState } from 'react';
import listIcon from "../images/icons/list.svg"
import { Dropdown } from 'react-bootstrap';
import { editList, deleteList } from "../api/api";
import { CreateEditFormData, SetState } from "../types/Utils";
import { defaultList } from "../config/default";
import { CreateEditForm } from './CreateEditForm';
import { List } from '../types/List';
import { Task } from '../types/Task';
import { Context } from '../App';

interface SidebarListItemProps {
     list: List;
     currentList: List | undefined;
     setCurrentList: SetState<List>;
     fetchAll: () => void;
     allTasks: Task[];
}

export const SidebarListItem: FC<SidebarListItemProps> = ({ list, currentList, setCurrentList, fetchAll, allTasks }) => {

     const context = useContext(Context);
     const toggleSidebar = () => {
          context?.setStore({
               ...context.store,
               sidebarToggled: !context.store.sidebarToggled
          });
     }
     
     const [activeEditList, setActiveEditList] = useState<number | undefined>(undefined);

     const handleItemClick = (list: List) => {
          setCurrentList(list)
          localStorage.setItem('currentListId', JSON.stringify(list.id));
          if (window.innerWidth < 768) {
               toggleSidebar();
          }
     }

     const submitEditList = (formData: CreateEditFormData) => {
          if (formData.id != undefined) {
               editList(formData.id, { ...defaultList, name: formData.name }, () => {
                    fetchAll();
                    setActiveEditList(undefined);
               });
          } else {
               alert('Error: List ID is missing.');
          }
     }

     const handleEditToggle = (id?: number) => {
          setActiveEditList(id);
     }

     const handleDelete = (id?: number) => {
          if (id != undefined) {
               deleteList(id, fetchAll);
               setCurrentList(defaultList);
               const storedcurrentListId = localStorage.getItem('currentListId');
               if (storedcurrentListId !== null && storedcurrentListId !== '') {
                    const currentListId = JSON.parse(storedcurrentListId);
                    if(currentListId === id){
                         localStorage.setItem('currentListId', '');
                    }
               }
               
          } else {
               alert('Error: List ID is missing.');
          }
     }

     return (
          <li className={`sidebar-section-list-item mb-1 ${currentList != undefined && list.id === currentList.id ? 'active' : ''}`}>
               <div className="icon ms-3" onClick={() => handleItemClick(list)}>
                    <img src={listIcon} alt="list icon" />
               </div>
               {activeEditList === list.id ? (
                    <CreateEditForm
                         submitFunction={submitEditList}
                         existingData={list}
                         entity={"list"}
                    />
               ) : (
                    <>
                         <span className='item-title py-3' onClick={() => handleItemClick(list)}>{list.name}</span>
                    </>
               )}
               <div className="item.options">
                    <Dropdown>
                         <Dropdown.Toggle variant="link" size="sm" id={`list-options-${list.id}`} />
                         <Dropdown.Menu>
                              <Dropdown.Item onClick={() => handleEditToggle(list.id)}>Edit</Dropdown.Item>
                              <Dropdown.Item onClick={() => handleDelete(list.id)}>Delete</Dropdown.Item>
                         </Dropdown.Menu>
                    </Dropdown>
               </div>
          </li>
     );
};