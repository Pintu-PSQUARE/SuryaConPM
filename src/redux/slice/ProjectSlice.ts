import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STORAGE_NAME } from "../../config/Env";
import { StorageManager } from "./../../storage/index";

interface ProjectState {
  projects: any[];
  projectTowers: any[];
  projectTowerDetails: any[];
}

const initialState: ProjectState = {
  projects: [],
  projectTowers: [],
  projectTowerDetails: [],
};

// ✅ Load projects from MMKV when the app starts
export const loadProjectsFromStorage = createAsyncThunk(
  "project/loadProjects",
  async () => {
    try {
      const projects = StorageManager.getItem<any[]>(STORAGE_NAME, "getAllProjects") ?? [];
      const projectTowers = StorageManager.getItem<any[]>(STORAGE_NAME, "getProjectTowerById") ?? [];
      const projectTowerDetails = StorageManager.getItem<any[]>(STORAGE_NAME, "getProjectTowerDetailsByIdAndLocation") ?? [];

      const finalProjects = Array.isArray((projects as any)?.docs) ? (projects as any).docs : [];
      const finalprojectTowers = Array.isArray((projectTowers as any)?.docs) ? (projectTowers as any).docs : [];
      const finalprojectTowerDetails = Array.isArray((projectTowerDetails as any)?.docs) ? (projectTowerDetails as any).docs : [];

      return { projects:finalProjects, projectTowers:finalprojectTowers, projectTowerDetails:finalprojectTowerDetails };
    } catch (error) {
      console.error("❌ Error loading data from MMKV:", error);
      return { projects: [], projectTowers: [], projectTowerDetails: [] };
    }
  }
);

// ✅ Create the Redux slice
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // setProjects: (state, action: PayloadAction<any[]>) => {
    //   state.projects = action.payload;
    //   StorageManager.setItem(STORAGE_NAME, "getAllProjects", action.payload); 
    // },
    // setProjectTowers: (state, action: PayloadAction<any[]>) => {
    //   state.projectTowers = action.payload;
    //   StorageManager.setItem(STORAGE_NAME, "projectTowers", action.payload); // Save to MMKV
    // },
    // setProjectTowerDetails: (state, action: PayloadAction<any[]>) => {
    //   state.projectTowerDetails = action.payload;
    //   StorageManager.setItem(STORAGE_NAME, "projectTowerDetails", action.payload); // Save to MMKV
    // },
    // resetProjects: (state) => {
    //   state.projects = [];
    //   StorageManager.removeItem(STORAGE_NAME, "projects"); // Clear MMKV
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(loadProjectsFromStorage.fulfilled, (state, action) => {
      state.projects = action.payload.projects;
      state.projectTowers = action.payload.projectTowers;
      state.projectTowerDetails = action.payload.projectTowerDetails;
    });
  },
});

// export const { setProjects, setProjectTowers, setProjectTowerDetails, resetProjects } =
//   projectSlice.actions;
export default projectSlice.reducer;