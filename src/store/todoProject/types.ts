import {IProject} from "../../models/IProject";
import {ITodo} from "../../models/ITodo";

export interface interfaceState {
    activeProject: IProject | null;
    editableTodo: ITodo | null,
    error: string | null,
    isLoading: boolean
}
