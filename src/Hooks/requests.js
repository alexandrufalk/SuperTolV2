const API_URL = "http://localhost:5001/v1/databaseproject";

async function httpGetAllProjects() {
  // TODO: Once API is ready.
  const response = await fetch(`${API_URL}/`);

  return await response.json();
  // Load Database and return as JSON.
}

//add new project

async function httpAddNewProject(project) {
  console.log("launch httpSubmitLaunch", project);
  // TODO: Once API is ready.
  // Submit given project data to launch system.
  try {
    return await fetch(`${API_URL}/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

//delete project

async function httpDeleteProject(id) {
  // TODO: Once API is ready.
  // Delete project with given ID.
  try {
    return await fetch(`${API_URL}/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}
//add case
async function httpAddNewCase(id, addCase) {
  try {
    return await fetch(`${API_URL}/case/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addCase),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete case
async function httpDeleteCase(id, caseId) {
  try {
    return await fetch(`${API_URL}/case/${id}/${caseId}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Add new dimension
async function httpAddNewDim(id, newDim) {
  try {
    return await fetch(`${API_URL}/dim/${id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDim),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete dimension
async function httpDeleteDim(id, dimId) {
  try {
    return await fetch(`${API_URL}/dim/${id}/${dimId}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Add new Case dimension
async function httpAddNewCaseDim(id, idCase, newCaseDim) {
  try {
    return await fetch(`${API_URL}/dimCase/${id}/${idCase}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCaseDim),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete Case dimension
async function httpDeleteCaseDim(id, idCase, caseDimID) {
  try {
    return await fetch(`${API_URL}/dimCase/${id}/${idCase}/${caseDimID}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

//Add image to Dimension

async function httpAddNewImage(id, idDim, file) {
  try {
    const formData = new FormData();
    formData.append("img", file);

    return await fetch(`${API_URL}/image/${id}/${idDim}`, {
      method: "POST",
      body: formData,
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

// Delete dimension
async function httpDeleteImg(id, dimId, idImg) {
  try {
    return await fetch(`${API_URL}/image/${id}/${dimId}/${idImg}`, {
      method: "delete",
    });
  } catch (err) {
    return {
      ok: false,
    };
  }
}

export {
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
};
