import { baseApi } from '../util';

export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query<{ success: boolean; data: any[] }, { status: string }>({
      query: ({ status }) => `/projectmanager/getallprojects?status=${status}`,
    }),
    
    getProjectTowerById: builder.query<{ success: boolean; data: any[] }, { projectId: string }>({
      query: ({ projectId }) => `projectmanager/gettowerdetails?projectId=${projectId}`,
    }),
  }),
});

export const { useGetAllProjectsQuery, useGetProjectTowerByIdQuery } = projectApi;