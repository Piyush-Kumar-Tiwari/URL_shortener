import crypto from 'crypto'
import fs from 'fs/promises'
import { writeFile,readFile } from 'fs/promises'
import path from 'path'
import {Router}from 'express'
import { getshortenerpage, postURLShortener, redirectToShortLink } from '../controllers/postshortener.controller.js'

// const router = express.Router()
const router =Router()




// router.get('/', async (req, res) => {
//     try {
//         const file =readFile(path.join("views","index.html"))
//         const csspath=readFile(path.join("public","style.css"))
//         const links = await loadlinks()

//         const content = file.toString().replaceAll("{{shortened_urls}}", 
//             Object.entries(links).map(([shortcode, url]) => 
//                 `<li><a href="/${shortcode}" target="_blank">${req.get('host')}/${shortcode}</a> → ${url}</li>`
//             ).join(""))

//         return res.send(content,csspath)
       
//     } catch (error) {
//       console.log(error)
//         return res.status(500).send("internal server error")
//     }
// })
router.get('/',getshortenerpage);



router.post("/",postURLShortener)


// Fixed route parameter
router.get("/:shortcode", redirectToShortLink)


//default export
// export default router

export const shortenedRoutes = router