import React, { FC } from 'react';
import stationery from "../images/taskdetailbg.png"

interface EmptyMessageProps{
     message: string;
}

export const EmptyMessage: FC<EmptyMessageProps> = ({message}) => {
     return (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center">
               <small className="text-middle text-center">{message}</small>
               <img width="300" className="empty-img opacity-3" src={stationery} alt="" />
          </div>
     );
};