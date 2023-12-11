import { useCallback, useEffect, useState } from "react";
import {
  httpGetAllTemplates,
  httpAddNewTemplate,
  httpDeleteTemplate,
  httpAddDataToTemplate,
  httpDeleteDataFromTemplate,
} from "./requestsTemplate";

function useTemplate() {
  const getTemplates = useCallback(async () => {
    try {
      const fetchedTemplates = await httpGetAllTemplates();
      console.log("fetchedTemplates", fetchedTemplates);
      saveTemplates(fetchedTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  }, []);

  useEffect(() => {
    getTemplates();
  }, [getTemplates]);

  const [templates, saveTemplates] = useState([]);

  console.log("useTemplate templates", templates);

  const addNewTemplate = useCallback(
    async (newTemplate) => {
      try {
        const response = await httpAddNewTemplate(newTemplate);
        if (response.ok) {
          getTemplates();
        } else {
          console.log("Template wasn't added to the database");
        }
      } catch (error) {
        console.error("Error adding new template:", error);
      }
    },
    [getTemplates]
  );

  const removeTemplate = useCallback(
    async (id) => {
      try {
        const response = await httpDeleteTemplate(id);
        if (response.ok) {
          getTemplates();
        } else {
          console.log("Template wasn't deleted");
        }
      } catch (error) {
        console.error("Error deleting template:", error);
      }
    },
    [getTemplates]
  );

  const addDataToTemplate = useCallback(
    async (templateID, newData) => {
      try {
        const response = await httpAddDataToTemplate(templateID, newData);
        if (response.ok) {
          getTemplates();
        } else {
          console.log("Data wasn't added to the template");
        }
      } catch (error) {
        console.error("Error adding data to template:", error);
      }
    },
    [getTemplates]
  );

  const removeDataFromTemplate = useCallback(
    async (templateID, dataIndex) => {
      try {
        const response = await httpDeleteDataFromTemplate(
          templateID,
          dataIndex
        );
        if (response.ok) {
          getTemplates();
        } else {
          console.log("Data wasn't deleted from the template");
        }
      } catch (error) {
        console.error("Error deleting data from template:", error);
      }
    },
    [getTemplates]
  );

  return {
    templates,
    addNewTemplate,
    removeTemplate,
    addDataToTemplate,
    removeDataFromTemplate,
  };
}

export default useTemplate;
