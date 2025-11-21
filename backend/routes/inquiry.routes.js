module.exports = app => {
  const i = require("../controllers/inquiry.controller.js");
  const r = require("express").Router();
  r.post("/", i.create);
  r.get("/", i.findAll);
  r.get("/:id", i.findOne);
  r.put("/:id", i.update);
  r.delete("/:id", i.delete);
  app.use("/api/inquiries", r);
};
