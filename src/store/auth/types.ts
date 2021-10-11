import { IUser } from "../../models/IUser";

export interface interfaceState {
    user: IUser | null,
    isAuth: boolean,
    isLoading: boolean,
    error: string | null
}
