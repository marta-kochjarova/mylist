import React, { useState, useContext, FC } from "react"
import { List } from "../types/List"
import { Context } from "../App";
import { CreateEditForm } from "./CreateEditForm";
import { createList } from "../api/api";
import { CreateEditFormData, SetState, TaskCount } from "../types/Utils";
import { Task } from "../types/Task";
import { Logo } from "./Logo";
import { SidebarListItem } from "./SidebarListItem";
import { Form } from "react-bootstrap";
import { SidebarToggler } from "./SidebarToggler";
import sun from "../images/icons/sun.svg"
import moon from "../images/icons/moon.svg"

interface SidebarProps {
     lists: List[];
     currentList: List | undefined;
     setCurrentList: SetState<List>;
     fetchAll: () => void;
     allTasks: Task[];
}

export const Sidebar: FC<SidebarProps> = ({ lists, currentList, setCurrentList, fetchAll, allTasks }) => {

     const context = useContext(Context);
     const toggleDarkMode = () => {
          context?.setStore({
               ...context.store,
               darkMode: !context.store.darkMode
          });
          localStorage.setItem('darkMode', JSON.stringify(!context?.store.darkMode));
     }

     const submitCreateList = (formData: CreateEditFormData) => {
          createList({ name: formData.name }, fetchAll);
     }

     return (
          <aside id="sidebar" className={`primary-bg d-flex flex-column overflow-y-scroll border-right ${!context?.store.sidebarToggled ? '' : 'collapsed'}`}>
               <SidebarToggler showOnDevice={'mobile'} />
               <div className="sidebar-section mb-5 mt-4">
                    <Logo />
               </div>
               <div className="divider"></div>
               <div className="sidebar-section mt-4">
                    <div className="w-100 mb-2 ms-1">
                         <span className="sidebar-section-name">My lists <span className="fw-normal">({lists.length})</span></span>
                    </div>
                    <ul className="sidebar-section-list">
                         <li className="pb-2 pt-0">
                              <CreateEditForm submitFunction={submitCreateList} entity={"list"} />
                         </li>
                         {lists.map((list) => (
                              <SidebarListItem
                                   key={list.id}                                   
                                   list={list}
                                   currentList={currentList}
                                   setCurrentList={setCurrentList}
                                   fetchAll={fetchAll}
                                   allTasks={allTasks}
                              />
                         ))}
                    </ul>
               </div>
               <div className="divider"></div>
               <Form className="dark-mode-btn mt-auto d-flex align-items-center align-self-center">
                    <img className="icon" src={sun} alt="sun icon" />
                    <Form.Check
                         type="switch"
                         id="dark-mode"
                         checked={context?.store.darkMode}
                         onChange={() => toggleDarkMode()}
                         className="mt-0"
                    />
                    <img className="icon" src={moon} alt="moon icon" />
               </Form>
          </aside>
     )
}