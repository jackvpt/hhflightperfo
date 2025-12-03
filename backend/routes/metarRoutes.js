import express from "express"
import { getMetar } from "../controllers/metarController.js"

const router = express.Router()

// GET /metar?ids=XXXX&hours=1.5
router.get("/", getMetar)

export default router
