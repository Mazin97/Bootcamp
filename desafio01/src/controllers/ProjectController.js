const projects = [];

function checkProjectExists(id, res) {
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }
}

module.exports = {
  get(req, res) {
    return res.json(projects);
  },

  post(req, res) {
    const { id, title } = req.body;

    projects.push({ id, title });

    return res.json(projects);
  },

  put(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    checkProjectExists(id, res);
    let project = projects.find(el => el.id === id);

    if (project) {
      project.title = title;
    }

    return res.json(project);
  },

  delete(req, res) {
    const { id } = req.params;
    checkProjectExists(id, res);

    const projectId = projects.findIndex(p => p.id == id);
    projects.splice(projectId, 1);

    return res.send();
  },

  postTask(req, res) {
    const { id } = req.params;
    const { title } = req.body;

    checkProjectExists(id, res);
    let project = projects.find(el => el.id === id);

    if (project) {
      if (!project.tasks) project.tasks = [];

      project.tasks.push(title);
    }

    return res.json(project);
  }
};
