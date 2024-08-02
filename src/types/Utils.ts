export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface CreateEditFormData{
     id?: number;
     parentId?: number;
     name: string;
     status?: boolean;
}

export interface TaskCount {
     trueCount: number;
     totalCount: number;
}