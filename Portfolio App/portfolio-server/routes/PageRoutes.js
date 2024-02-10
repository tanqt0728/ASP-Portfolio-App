const express = require("express");
const {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
} = require("../controllers/PageControllers");

const router = express.Router();

router.post("/", create);
router.post("/:pageId/content", changeContent);

router.put("/:pageId", update);

router.delete("/:pageId", deletePageRecord);

router.get("/:pageId", details);
router.get("/", list);
router.get("/:pageId/content", loadContent);


module.exports = router;