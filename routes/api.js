const express = require("express")
const router = express.Router()

const IndexController = require("../controllers/index.controller")
const { validate } = require("../middlewares/validators/wrapper.validator")
const { indexValidator } = require("../middlewares/validators/index.validations")
const EventsController = require('../controllers/event.controller')
const UserController = require('../controllers/user.controller')


router.get("/", IndexController.index)
router.post("/", validate(indexValidator), IndexController.indexPost)
router.get('/events/upcoming', EventsController.get_all_upcoming_events)
router.get('/events/past', EventsController.get_all_past_events)
router.post('/users/subscribe', UserController.subscribe_user)
router.get('/users/all', UserController.get_all_users)
router.delete('/users/all', UserController.delete_all_users)

module.exports = router
