const express = require('express');
const Post = require('./models/Post');
const router = express.Router();



//Get all posts
router.get("/posts", async(req, res) => {
    const posts = await Post.find()
    res.send(posts)
});


//Create a new Post
router.post("/posts", async (req,res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.content,
    })
    await post.save()
    res.send(post)
});

//Get post by ID
router.get("/posts/:id", async (req, res) => {
    try{
    const post = await Post.findOne({_id: req.params.id})
    res.send(post)
    }catch{
        res.status(404)
        res.send({error: "Post doesn't exist!"})
    }
});

//Update Post
router.patch("/posts/:id", async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params.id})
        if(req.body.title){
            post.title = req.body.title
        }
        if(req.body.content){
            post.content = req.body.content
        }
        await post.save()
        res.send(post)

    } catch{
        res.status(404)
        res.send({error: "Post doesn't exist!"})
    }
});

//Delete post
router.delete("/posts/:id", async (req,res) => {
    try{
        await Post.deleteOne({_id: req.params.id})
    }  catch{
        res.status(404)
        res.send({error: "Post doesn't exist!"})
    }
});
module.exports = router;
