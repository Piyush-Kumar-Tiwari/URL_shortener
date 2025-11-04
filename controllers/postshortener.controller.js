import crypto from 'crypto'
import { loadlinks,savelinks } from '../models/shortener.model.js'
import path from 'path'

import { readFile,writeFile } from 'fs/promises'
import fs from 'fs/promises'
export const getshortenerpage = async (req, res) => {
      try {
       
        const links = await loadlinks()

      return res.render("index",{links,hosts:req.host})
    }  catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}
export const postURLShortener=async (req, res) => {
    try {
        const { url, shortcode } = req.body
        
        if (!url) {
            return res.status(400).send("URL is required")
        }
        
        const finalShortcode = shortcode || crypto.randomBytes(4).toString("hex")
        const links = await loadlinks()
        
        if (links[finalShortcode]) {
            return res.status(400).send("⚠️ Shortcode already exists. Please choose another one!")
        }
        
        links[finalShortcode] = url
        await savelinks(links)
        
        // Added response
        return res.redirect("/")
        // return res.status(200).json({
        //     shortcode: finalShortcode,
        //     url: url,
        //     shortened_url: `${req.protocol}://${req.get('host')}/${finalShortcode}`
        // })
        
    } catch (error) {
      console.log(error)
        return res.status(500).send("internal server error")
    }
}


export const redirectToShortLink =  async (req, res) => {
    try {
        const { shortcode } = req.params
        const links = await loadlinks()

        if (!links[shortcode]) {
            return res.status(404).send("Shortened URL not found")
        }

        return res.redirect(links[shortcode])
    } catch (error) {
        console.error(error)
        return res.status(500).send("internal server error")
    }
}