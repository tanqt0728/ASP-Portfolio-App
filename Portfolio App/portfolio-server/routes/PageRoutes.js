const express = require("express");
const jwtCheck = require('../middleware/jwtCheck'); 
const {
  changeContent,
  create,
  update,
  deletePageRecord,
  details,
  list,
  loadContent,
  getPageByUserId,
  getPageBySlug,
} = require("../controllers/PageControllers.js");

const router = express.Router();


// Protect routes with jwtCheck middleware
router.get('/', jwtCheck, list);
router.post('/', jwtCheck, create);
router.get('/user', jwtCheck, getPageByUserId);
router.get('/slug/:slug', getPageBySlug);
router.get("/:pageId", details);
router.put('/:pageId', jwtCheck, update);
router.get("/:pageId/content", loadContent);
router.post('/:pageId/content', jwtCheck, changeContent);
router.delete('/:pageId', jwtCheck, deletePageRecord);

module.exports = router;
