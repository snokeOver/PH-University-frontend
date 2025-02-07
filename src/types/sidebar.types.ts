import { ReactNode } from "react";

export interface IRoutes {
  path: string;
  element: ReactNode;
}
export interface INavLink {
  key: string;
  label: ReactNode;
  children?: INavLink[];
}

export interface IRouteItem {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: IRouteItem[];
}
