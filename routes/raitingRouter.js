const Router = require("express")
const raitingController = require("../controllers/raitingController")
const router = new Router()

router.post("/", raitingController.addRate)
router.get("/:deviceId", raitingController.getRaiting)

module.exports = router