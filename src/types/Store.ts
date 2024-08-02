import { SetState } from "./Utils";

export interface Store{
     darkMode: boolean;
     sidebarToggled: boolean;
}

export interface StoreState{
     store: Store;
     setStore: SetState<Store>;
}