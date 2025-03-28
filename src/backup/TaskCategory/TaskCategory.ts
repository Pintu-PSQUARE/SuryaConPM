import {STORAGE_NAME} from '../../config/Env';
import {projectApi} from '../../redux/api/projectApi';
import {AppDispatch} from '../../redux/store';
import {StorageManager} from '../../storage';

export const TaskCategory = async (
  dispatch: AppDispatch,
  categoryIds: string[],
): Promise<void> => {
  console.log('Processing category IDs', categoryIds);

  try {
    // Fetch Ongoing and Completed Projects
    const statuses: ('Ongoing' | 'Completed')[] = ['Ongoing', 'Completed'];

    for (const status of statuses) {
      const projectsResult = await dispatch(
        projectApi.endpoints.getAllProjects.initiate(
          {status},
          {forceRefetch: true},
        ),
      );

      const projectStorageKey = `getAllProjects`;
      StorageManager.saveSyncData(
        STORAGE_NAME,
        projectStorageKey,
        projectsResult.data?.data,
        new Date().toISOString(),
      );

      if (projectsResult.data.data.length > 0) {
        for (const project of projectsResult.data?.data ?? []) {
          // Fetch towers for each project
          const towersResult = await dispatch(
            projectApi.endpoints.getProjectTowerById.initiate(
              {projectId: project._id},
              {forceRefetch: true},
            ),
          );

          const towerStorageKey = `getProjectTowerById`;
          if (
            Array.isArray(towersResult.data?.data) &&
            towersResult.data.data.length > 0
          ) {
            StorageManager.updateCategoryItem(
              STORAGE_NAME,
              towerStorageKey,
              project._id,
              towersResult.data.data,
            );
          }

          if ((towersResult.data?.data ?? []).length > 0) {
            for (const tower of towersResult.data?.data ?? []) {
              // Fetch tower details based on project and category
              const towerDetailsResult = await dispatch(
                projectApi.endpoints.getProjectTowerDetailsByIdAndLocation.initiate(
                  {projectId: project._id, location_Id: tower.Location_id},
                  {forceRefetch: true},
                ),
              );
              const towerDetailsStorageKey = `getProjectTowerDetailsByIdAndLocation`;
              if (
                Array.isArray(towerDetailsResult.data?.data) &&
                towerDetailsResult.data.data.length > 0
              ) {
              StorageManager.updateCategoryItem(
                STORAGE_NAME,
                towerDetailsStorageKey,
                project._id,
                towerDetailsResult.data.data,
              );
            }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Error fetching task categories:', error);
  }
};
