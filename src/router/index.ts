import React from "react";
import {Login} from "../containers/Login/Login";
import {ProjectsController} from "../containers/ProjectsController/ProjectsController";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    PROJECTS = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, component: Login}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.PROJECTS, exact: true, component: ProjectsController}
]
