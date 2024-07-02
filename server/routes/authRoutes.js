import express from 'express'
import { register, login, updateUser, verifyToken } from '../controllers/authController.js'

const router = express.Router()

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/verifyToken').post(verifyToken)
router.route('/testingCors').get(login)
router.route('/updateUser').patch(updateUser)

export default router