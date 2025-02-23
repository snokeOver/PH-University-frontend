import { IAcademicSemester, TResponseRedux } from "../../../types";
import { baseAPI } from "../../api/baseAPI";

const academicManagementAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (response: TResponseRedux<IAcademicSemester[]>) => {
        return response;
      },
    }),
    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllAcademicSemesterQuery,
  useCreateAcademicSemesterMutation,
} = academicManagementAPI;
