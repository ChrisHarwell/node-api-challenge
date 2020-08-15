const express = require("express");
const action = require("../data/helpers/actionModel.js");
const router = express.Router();

// TODO add /:id to the get params
router.get("/:id", (req, res) => {
  const { id } = req.params;
  action
    .get(id)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Error retrieving the action",
      });
    });
});

router.post("/", (req, res) => {
  const actions = req.body;

  action.insert(actions).then((action) => {
    res.status(201).json(action);
  });
});

router.put("/:id", (req, res) => {
  action.update(req.params.id, req.body).then((action) => {
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const {id} = req.params;
  action.remove(id).then((count) => {
      console.log(count);
    if (count > 0) {
      res.status(200).json({ message: "The action has been deleted" });
    } else {
      res.status(404).json({ message: "The action could not be found" });
    }
  });
});

module.exports = router;
