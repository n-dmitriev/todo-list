import {IProject} from "../../models/IProject";

export interface interfaceState {
    projectList: IProject[];
    error: string | null,
    isLoading: boolean
}
