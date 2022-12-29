import express from 'express'
import { encodeUrl, editURL } from '../Controllers/encode.controller.js' 

const encodeRouter = express.Router()

encodeRouter.post('/', encodeUrl)
encodeRouter.patch('/', editURL)

export { encodeRouter }