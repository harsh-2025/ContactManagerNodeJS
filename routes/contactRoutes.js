const express = require("express");
const router = express.Router();
const { getContact, createContact, getContactById, updateContact, deleteContact } = require("../controllers/contactController");
const { validateToken } = require("../middleware/validateTokenHandler");

router.use(validateToken)

router.route("/").get(getContact)
// router.route("/").get(getContact).post(createContact)



// router.route("/").post((req, res) => {
//     res.status(200).json({message:"Create all contacts route"})
// })
// router.route("/:id").get((req, res) => {
//     res.status(200).json({message:`{get all contacts route for ${req.params.id}}`})
// })
// router.route("/:id").put((req, res) => {
//     res.status(200).json({message:`{Update all contacts route for ${req.params.id}}`})
// })
// router.route("/:id").delete((req, res) => {
//     res.status(200).json({message:`{Delete  contacts route for ${req.params.id}}`})
// })
router.route("/").post(createContact)
router.route("/:id").get(getContactById)
router.route("/:id").put(updateContact)
router.route("/:id").delete(deleteContact)
module.exports = router;