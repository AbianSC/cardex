module.exports = app => {
  const c = require("../controllers/customer.controller.js");
  const r = require("express").Router();
  r.post("/", c.create);
  r.get("/", c.findAll);
  r.get("/:id", c.findOne);
  r.put("/:id", c.update);
  r.delete("/:id", c.delete);
  app.use("/api/customers", r);
};
