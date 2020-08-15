const express = require("express");
const project = require("../data/helpers/projectModel.js");
const router = express.Router();

// TODO add /:id to the get params
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

router.post("/", (req, res) => {
  const projects = req.body;

  project.insert(projects).then((project) => {
    res.status(201).json(project);
  });
});

router.put("/:id", (req, res) => {
  project.update(req.params.id, req.body).then((project) => {
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;

  project.remove(id).then((count) => {
      console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The project has been deleted" });
    } else {
      res.status(404).json({ message: "The project could not be found" });
    }
  });
});

module.exports = router;
