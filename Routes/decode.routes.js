import express from 'express'
import { decodeShortUrl, noShortIdProvided, redirectShortUrl } from '../Controllers/decode.controller.js'

const decodeRouter = express.Router()

decodeRouter.get('/decode', noShortIdProvided)
decodeRouter.get('/:shortId', redirectShortUrl)
decodeRouter.get('/decode/:shortId', decodeShortUrl)




export { decodeRouter }