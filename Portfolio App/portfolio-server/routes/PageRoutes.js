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

router.post("/editor", create);
router.post("/editor/:pageId/content", changeContent);

router.put("/editor/:pageId", update);

router.delete("/editor/:pageId", deletePageRecord);

router.get("/editor/:pageId", details);
router.get("/editor", list);
router.get("/editor/:pageId/content", loadContent);


module.exports = router;