import React, { useState, FC, useEffect } from "react";
import { CreateEditFormData } from "../types/Utils";
import { defaultCreateEditFormData } from "../config/default";
import sendIcon from "../images/icons/send.svg"

interface CreateEditFormProps {
     submitFunction: (data: CreateEditFormData) => void;
     existingData?: CreateEditFormData;
     entity: string;
}
export const CreateEditForm: FC<CreateEditFormProps> = ({ submitFunction, existingData, entity }) => {

     const [formData, setFormData] = useState<CreateEditFormData>(
          existingData ?? defaultCreateEditFormData
     );

     useEffect(() => {
          setFormData(existingData ?? defaultCreateEditFormData)
     }, [existingData])

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value,
          });
     };

     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          submitFunction(formData);
          setFormData({ ...defaultCreateEditFormData, parentId: existingData?.parentId });
     };

     return (
          <form className="create-edit-form" onSubmit={handleSubmit}>
               <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={`New ${entity} name`}
                    autoComplete="off"
                    required
               />
               <button type="submit">
                    <img draggable="false" src={sendIcon} alt="" className="icon" />
               </button>
          </form>
     );
}