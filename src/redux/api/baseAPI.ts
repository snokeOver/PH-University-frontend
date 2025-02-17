import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set("authorization", token);
    return headers;
  },
});

const baseQueryWithCustomToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOption): Promise<any> => {
  let result = await baseQuery(args, api, extraOption);

  if (result?.error?.status === 404) {
    toast.error("User not found");
  }

  if (result?.error?.data?.message === "jwt expired") {
    console.log("Getting access token by refresh tkoen");
    const res = await fetch("http://localhost:3500/api/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOption);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithCustomToken,
  endpoints: () => ({}),
});
