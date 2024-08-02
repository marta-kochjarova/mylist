import { List } from "../types/List";
import { Store } from "../types/Store"
import { Task } from "../types/Task";
import { CreateEditFormData } from "../types/Utils";

export const defaultStore: Store = {
     darkMode: false,
     sidebarToggled: false,
}

export const defaultList: List = {
     name: ''
}

export const defaultTask: Task = {
     name: '',
     status: false, 
     listId: 0
}

export const defaultCreateEditFormData: CreateEditFormData = {
     name: ''
}