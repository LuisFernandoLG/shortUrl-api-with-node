import {Router} from "express"
import { getLongLink } from "../controllers/redirectController"
const router = Router()

router.get("/:nanoLink", getLongLink)


export default router