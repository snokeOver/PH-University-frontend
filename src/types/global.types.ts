import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface IError {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

export interface IResponse<T> {
  data?: T;
  error?: IError;
  success: boolean;
  message: string;
}

export type TResponseRedux<T> = IResponse<T> & BaseQueryApi;
