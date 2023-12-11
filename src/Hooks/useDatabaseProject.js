import { useCallback, useEffect, useState } from "react";
import {
  httpGetAllProjects,
  httpAddNewProject,
  httpDeleteProject,
  httpAddNewCase,
  httpDeleteCase,
  httpAddNewDim,
  httpDeleteDim,
  httpAddNewCaseDim,
  httpDeleteCaseDim,
  httpAddNewImage,
  httpDeleteImg,
} from "./requests";

function useDatabaseProjects() {
  const getDatabaseProjects = useCallback(async () => {
    try {
      const fetchedDatabaseProjects = await httpGetAllProjects();
      console.log("fetchedDatabaseProjects", fetchedDatabaseProjects);
      saveDatabaseProjects(fetchedDatabaseProjects);
    } catch (error) {
      console.error("Error fetching database projects:", error);
    }
  }, []);

  useEffect(() => {
    getDatabaseProjects();
  }, [getDatabaseProjects]);

  const [databaseProjects, saveDatabaseProjects] = useState([]);

  console.log("useDatabaseProject databaseProjects:", databaseProjects);

  const addNewProject = useCallback(
    async (project) => {
      try {
        const response = await httpAddNewProject(project);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Project wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new project:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeProject = useCallback(
    async (id) => {
      try {
        const response = await httpDeleteProject(id);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Project wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addNewCase = useCallback(
    async (id, newCase) => {
      try {
        const response = await httpAddNewCase(id, newCase);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Case wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new case:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeCase = useCallback(
    async (projectId, caseId) => {
      try {
        const response = await httpDeleteCase(projectId, caseId);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Case wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting case:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addNewDim = useCallback(
    async (id, newDim) => {
      try {
        const response = await httpAddNewDim(id, newDim);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeDim = useCallback(
    async (projectId, dimId) => {
      try {
        const response = await httpDeleteDim(projectId, dimId);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addNewCaeDim = useCallback(
    async (id, idCase, newCaseDim) => {
      try {
        const response = await httpAddNewCaseDim(id, idCase, newCaseDim);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeCaseDim = useCallback(
    async (id, idCase, caseDimID) => {
      try {
        const response = await httpDeleteCaseDim(id, idCase, caseDimID);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  const addImage = useCallback(
    async (id, idDim, file) => {
      try {
        console.log("addImage check");
        const response = await httpAddNewImage(id, idDim, file);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Image wasn't added");
        }
      } catch (error) {
        console.error("Error adding new image:", error);
      }
    },
    [getDatabaseProjects]
  );

  const removeImg = useCallback(
    async (projectId, dimId, idImg) => {
      try {
        const response = await httpDeleteImg(projectId, dimId, idImg);
        if (response) {
          getDatabaseProjects();
        } else {
          console.log("Dimension wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting dimension:", error);
      }
    },
    [getDatabaseProjects]
  );

  return {
    getDatabaseProjects,
    databaseProjects,
    addNewProject,
    removeProject,
    addNewCase,
    removeCase,
    addNewDim,
    removeDim,
    addNewCaeDim,
    removeCaseDim,
    addImage,
    removeImg,
  };
}

export default useDatabaseProjects;
