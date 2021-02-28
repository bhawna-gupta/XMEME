//Routes for HTTP verbs

module.exports = app => {
    const memes = require("../controllers/controller.js"); 
    var router = require("express").Router();

    // Create a new Meme
    router.post("/",memes.create);
  
   // Get all memes
    router.get("/",  memes.findAll);
  
    // Get a single meme with id
    router.get("/:id", memes.findOne);
    
    // Update a meme with id
    router.patch("/:id", memes.update);
  
    // Delete a meme with id
    router.delete("/:id", memes.delete);
  
    // Delete all memes
    router.delete("/", memes.deleteAll);
  
    app.use('/memes', router);
  };