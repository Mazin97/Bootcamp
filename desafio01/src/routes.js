const express = require("express");
const Project = require("./controllers/ProjectController");
const routes = express.Router();

routes.get("/projects", Project.get);
routes.post("/projects", Project.post);
routes.post("/projects/:id/tasks", Project.postTask);
routes.put("/projects/:id", Project.put);
routes.delete("/projects/:id", Project.delete);

module.exports = routes;
