// Add imports as needed
const API_URL = "http://localhost:5001/v1/template";

async function httpGetAllTemplates() {
  const response = await fetch(`${API_URL}/`);
  return await response.json();
}

async function httpAddNewTemplate(newTemplate) {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTemplate),
    });
    return response;
  } catch (error) {
    console.error("Error adding new template:", error);
    return { ok: false };
  }
}

async function httpDeleteTemplate(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "delete",
    });
    return response;
  } catch (error) {
    console.error("Error deleting template:", error);
    return { ok: false };
  }
}

async function httpAddDataToTemplate(templateID, newData) {
  try {
    const response = await fetch(`${API_URL}/${templateID}/data`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    return response;
  } catch (error) {
    console.error("Error adding data to template:", error);
    return { ok: false };
  }
}

async function httpDeleteDataFromTemplate(templateID, dataIndex) {
  try {
    const response = await fetch(`${API_URL}/${templateID}/data/${dataIndex}`, {
      method: "delete",
    });
    return response;
  } catch (error) {
    console.error("Error deleting data from template:", error);
    return { ok: false };
  }
}

export {
  httpGetAllTemplates,
  httpAddNewTemplate,
  httpDeleteTemplate,
  httpAddDataToTemplate,
  httpDeleteDataFromTemplate,
};
