const express = require("express");
const project = require("../data/helpers/projectModel.js");
const router = express.Router();

router.get("/", (req, res) => {
  // NOTE: i'm fully aware that the way i wrote this code is bad 
  // practice but i couldn't think of another way to make it work in time
  const { id } = req.params;
  project.get(id).then((project) => {
    res.status(200).json(project);
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  project
    .get(id)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving the project",
      });
    });
});

router.post("/", validateData, (req, res) => {
  const projects = req.body;
  project
        .insert(projects)
        .then((project) => {
          res.status(201).json(project);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            message: "Error retrieving the project",
          });
        })
});

router.put("/:id", validateData, (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  project.update(id, changes).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  project.remove(id).then((count) => {
    console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The project has been deleted" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  });
});

function validateData(req,res,next) {
  const projects = req.body;
  projects.description && projects.name ? next() : res.status(400).json({ message: "missing either a body or name" });
}
module.exports = router;
