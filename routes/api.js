const express = require("express")
const router = express.Router()

const IndexController = require("../controllers/index.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const { indexValidator } = require("../middlewares/validators/index.validations")
const EventsController = require('../controllers/event.controller')

router.get("/", IndexController.index)
router.post("/", validate(indexValidator), IndexController.indexPost)
router.get('/events/upcoming', EventsController.get_all_upcoming_events)
router.get('/events/past', EventsController.get_all_past_events)

module.exports = router
