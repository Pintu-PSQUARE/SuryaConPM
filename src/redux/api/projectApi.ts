import { baseApi } from "../store/util"; 

interface ApiResponse<T> {
  success: boolean;
  data: ReadonlyArray<T>;
}

interface Project {
  id: string;
  name: string;
  status: "Ongoing" | "Completed";
}

interface Tower {
  id: string;
  name: string;
}

interface TowerDetails {
  id: string;
  location: string;
  details: string;
}

// Injecting endpoints into baseApi
export const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch All Projects Based on Status
    getAllProjects: builder.query<ApiResponse<Project>, { status: "Ongoing" | "Completed" }>({
      query: ({ status }) => ({ url: `/projectmanager/getallprojects?status=${status}` }),
      // providesTags: ["Project"],
    }),

    // Fetch Project Tower by ID
    getProjectTowerById: builder.query<ApiResponse<Tower>, { projectId: string }>({
      query: ({ projectId }) => ({ url: `/projectmanager/gettowerdetails?projectId=${projectId}` }),
      // providesTags: ["ProjectTower"],
    }),

    // Fetch Project Tower Details by ID & Location
    getProjectTowerDetailsByIdAndLocation: builder.query<
      ApiResponse<TowerDetails>,
      { projectId: string; location_Id: string }
    >({
      query: ({ projectId, location_Id }) => ({
        url: `/projectmanager/gettaskdetailsbylocationid?projectId=${encodeURIComponent(projectId)}&locationId=${location_Id}`,
      }),
      // providesTags: ["ProjectTowerDetails"],
    }),
  }),
});

// Exporting the hooks for usage in components
export const {
  useGetAllProjectsQuery,
  useGetProjectTowerByIdQuery,
  useGetProjectTowerDetailsByIdAndLocationQuery,
} = projectApi;