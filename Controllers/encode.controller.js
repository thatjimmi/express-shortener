import { shortenedUrls } from '../db/memoryStorage.js';
import { isUrlValid } from '../Helpers/urlValidation.js';
import env from 'dotenv'

env.config()

const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

let shortenedCache = {}

const encodeUrl = (req, res) => {
    const { url } = req.body    
    let { shortId } = req.body
    
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
        if(!shortId){
            shortId = Math.random().toString(36).substring(6)
            // Make sure the short ID is unique and not already in the map
            while (shortenedUrls.has(shortId)) {
            shortId = Math.random().toString(36).substring(6)
            }
        }
        shortenedUrls.set(shortId, url)         
        shortenedCache[url] = shortId
        res.json({shortURL: `${baseUrl}/${shortId}`, encodedUrl: url})
    }
}

const editURL = (req, res) => {
    const { url, shortId } = req.body
    
    if(!url || !shortId){
        const error = new Error('Please provide a URL and a short ID')
        error.status = 400
        throw error        
    }

    // Check if the URL is valid and if url is already in the cache
    if (!isUrlValid(url)  || !shortenedCache[url]) {
        const error = new Error('The provided URL is not valid')
        error.status = 400
        throw error
    }

    // delete the old URL from the cache
    delete shortenedCache[shortenedUrls.get(shortId)]

    // Add the new ShortId with URL to the map 
    shortenedUrls.set(shortId, url)

    // delete old shortId from map
    let oldShortId = shortenedCache[url]
    shortenedUrls.delete(oldShortId)    

    // update the cache
    shortenedCache[url] = shortId

    res.json({shortURL: `${baseUrl}/${shortId}`, encodedUrl: url})


}


export { encodeUrl, editURL }