import React, { FC } from 'react';
import logo from "../images/logo.png"

export const Logo: FC = () => {
     return (
          <div className="logo text-center">
               <img src={logo} alt="app logo" width="130" />
          </div>
     );
};