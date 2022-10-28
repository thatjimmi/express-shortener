import { shortenedUrls } from '../db/memoryStorage.js';
import { isUrlValid } from '../Helpers/urlValidation.js';
import env from 'dotenv'

env.config()

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

let shortenedCache = {}

const encodeUrl = (req, res) => {
    const { url } = req.body
    
    if(!url){
        const error = new Error('Please provide a URL')
        error.status = 400
        throw error        
    }

    // Check if the URL is valid
    if (!isUrlValid(url)) {
        const error = new Error('The provided URL is not valid')
        error.status = 400
        throw error
    }
    
    // Return the short URL if it is already in the cache
    if (shortenedCache[url]) {
        res.json({shortURL: `${baseUrl}/${shortenedCache[url]}`, encodedUrl: url})
    }         
    else { 
        const shortId = Math.random().toString(36).substring(6)
        // Make sure the short ID is unique and not already in the map
        while (shortenedUrls.has(shortId)) {
            shortId = Math.random().toString(36).substring(6)
        }
        shortenedUrls.set(shortId, url)         
        shortenedCache[url] = shortId
        res.json({shortURL: `${baseUrl}/${shortId}`, encodedUrl: url})
    }
}

export { encodeUrl }