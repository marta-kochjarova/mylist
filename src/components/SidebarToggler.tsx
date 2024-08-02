import React, { FC, useContext } from 'react';
import menuIcon from "../images/icons/hamburger.svg"
import { Context } from "../App";

interface SidebarTogglerProps{
     showOnDevice: 'all' | 'mobile' | 'desktop';
}

export const SidebarToggler: FC<SidebarTogglerProps> = ({showOnDevice}) => {
     const context = useContext(Context);
     const toggleSidebar = () => {
          context?.setStore({
               ...context.store,
               sidebarToggled: !context.store.sidebarToggled
          });
     }
     const displayOn = () => {
          if(showOnDevice === 'all'){
               return 'd-flex'
          } else if(showOnDevice === 'mobile'){
               return 'd-flex d-md-none'
          } else if(showOnDevice === 'desktop'){
               return 'd-none d-md-flex'
          }
     }
     
     return (
          <button className={`icon big ${displayOn()}`} onClick={() => { toggleSidebar() }}>
               <img src={menuIcon} alt="" />
          </button>
     );
};