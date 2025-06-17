const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

const fetch = require('node-fetch');
async function fetchRandomGif(){
    const apiKey = process.env.GIPHY_API_KEY;
    try{
    const res = await fetch (`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`)
    const data = await res.json();
    if(data && data.data && data.data.images && data.data.images.original){
        return data.data.images.original.url;
    }else{
        return 'https://media.giphy.com/media/Ju715y9osyymQ/giphy.gif'
    }
    }catch(err){
        return 'https://media.giphy.com/media/Ju715y9osyymQ/giphy.gif'
    }
}

router.get('/', async (req, res) => {
    const kudo_board = await prisma.Kudos_Board.findMany();
    res.json(kudo_board);
});

router.post('/', async (req, res) => {
    const allowedCategories = ['Celebration','Thank You','Inspiration']
    if (!req.body.title || !allowedCategories.includes(req.body.category)){
        return res.status(400).json({message: 'Title and Category are required'});
    }
    const {title,category, gifUrl} =req.body;
    let finalGifUrl = gifUrl;
    if (!gifUrl){
        finalGifUrl = await fetchRandomGif();
    }
    const newBoard = await prisma.Kudos_Board.create({
        data: {
            title,
            category,
            gif_url: finalGifUrl
        }
    });
    res.status(201).json(newBoard);
});

router.delete('/:id',async(req,res)=>{
    const{id} = req.params;
    const deletedBoard = await prisma.Kudos_Board.delete({
        where : {id: parseInt(id)}
    })
    res.status(200).json(deletedBoard);
})
module.exports = router;
