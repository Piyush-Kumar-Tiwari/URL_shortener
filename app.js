
// import http from 'http'
// import path from 'path'
// import crypto from 'crypto'
// import { json } from 'stream/consumers'
// import fs from 'fs/promises'
// import express from 'express'
// const PORT =1000
// const app = express()
// app.use(express.static('public'))
// const DATA_FILE =path.join("data","links.json")
// const servefile = async (res,filepath,contentType)=>{
//      try {
//              const data =await fs.readFile(filepath)
//             res.writeHead(200,{"Content-Type":contentType})
//         } catch (error) {
//             res.writeHead(404,{'Content-Type': contentType})
//             res.end("404 page not found")
//         }
// }


// const loadlinks = async ()=>{
//     try {
//         const data =await fs.readFile(DATA_FILE,'utf-8')
//         return JSON.parse(data)
//     } catch (error) {
//         if(error.code==='ENOENT'){//error no entry
//         await writeFile(DATA_FILE,JSON.stringify({}))
//          return {}
//         }
//       throw error  
//     }
   
// }


// const savelinks = async ()=>{
//    await writeFile(DATA_FILE,JSON.stringify(links))
// }

// app.get('/',async (req,res)=>{
//   try {
//     const file=await fs.readFile(path.join("views","index.html"))
//     const links =await loadlinks()

//     const content = file.tostring().replaceAll("{{shortened_urls}}",Object.entries(links).map(([shortcode,url])=> `<li><a href="/${shortcode}" target="_blank">${req.host}/${shortcode}</a> → ${url}</li>`).join(""))

//     return res.send(content)
//   } catch (error) {
//     return res.status(500).send("internal server error")
//   }


// })

// app.post("/",async(req,res)=>{
//     try {
//                 const {url,shortcode} =req.body
//                 const finalShortcode = shortcode || crypto.randomBytes(4).tostring("hex")

//           const links =await loadlinks()
//          if(links[finalShortcode]){
//          return res.status(400).send("short code already exists.Please choose another")
//          }
//       links[finalShortcode]=url
//         await savelinks(links)

//     } catch (error) {
//          return res.status(500).send("internal server error")
//     }
// })



// app.get("/shortcode",async(req,res)=>{
//   try {
//     const {shortcode} = req.params
//     const links = await loadlinks()

//     if(!links[shortcode]) return res.status(404).send("404 error occured")

//      return res.redirect(links[shortcode]) 
//   } catch (error) {
//     console.error()
//      return res.status(500).send("internal server error")
//   }
// })



// // const server = http.createServer(async (req,res)=>{
// //    if(req.method ==='GET'){
// //      if(req.url ==='/'){
// //        return servefile(res,path.join("public","index.html"),"text/html")
// //      }
// //      else if(req.url==='style.css'){
// //         return servefile(res,path.join("public","style.css"),"text/css")
// //      }
// //      else if(req.url === '/links'){
// //         const links =await loadlinks()
// //         res.writeHead(200,{"contentType":"application/json"})
// //         return res.end(JSON.stringify(links))

// //      }
// //      const links =await loadlinks()
// //      const shortcode = req.url.slice(1)
// //      console.log("links red. ",req.url)
// //      if(links[shortcode]){
// //         res.writeHead(302,{location:links[shortcode]})
// //         return res.end()
// //      }
// //      res.writeHead(404,{"contentType":"text/plain"})
// //      return res.end("shortened url not found")
// //    }
// //   //  if(req.method==='POST' && req.url ==='/shorten'){

// //   //   const links = await loadlinks()
// //   //   let body = ""
// //   //      req.on("data",(chunk)=>{
// //   //      body =body + chunk
// //   //      })
// //   //      req.on('end',async ()=>{
// //   //       const {url,shortcode} =JSON.parse(body)
// //   //       if(!url){
// //   //           res.writeHead(400,{"contentType":"text/plain"})
// //   //           return res.end("URL is required")
// //   //       }
// //   //       const finalShortcode = shortcode || crypto.randomBytes(4).tostring("hex")

// //   //       if(links[finalShortcode]){
// //   //             res.writeHead(400,{"contentType":"text/plain"})
// //   //           return res.end("short code already exists.Please choose another")
// //   //       }
// //   //       links[finalShortcode]=url
// //   //       await savelinks(links)

// //   //       res.writeHead(200,{"content-Type":"/json"})

// //   //        })

// //   //  }

// // })

// app.listen(PORT,()=>{
//     console.log(`server running at http://localhost:${PORT}`)
// })






import express from 'express'
import { shortenedRoutes } from './routes/shorterner.route.js'


const PORT = 1000
const app = express()
app.use(express.static("public"));
app.use(express.json()) // Added missing middleware
app.use(express.urlencoded({ extended: true }))

app.set("view engine","ejs")

app.set('views','./views')

app.use(shortenedRoutes)



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})
