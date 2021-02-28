//CRUD Operations
const db = require("../models");
const Meme = db.memes;

// Create and Save a new Meme
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Name can not be empty!" });
      return;
    }

    if (!req.body.caption) {
      res.status(400).send({ message: "Caption can not be empty!" });
      return;
    }

    if (!req.body.url) {
      res.status(400).send({ message: " Meme URL can not be empty!" });
      return;
    }

 // Create a Meme
   const meme = new Meme({
      name: req.body.name,
      caption: req.body.caption,
      url: req.body.url
   });

   //Check for Duplicates
          meme
          .save(meme)
          .then(data => 
            {
            res.send({id:data.id});
          })
          .catch(err => 
            {
              if(err.message && err.message.includes("name_1_caption_1_url_1 dup")){
                res.status(409).json({msg:"Duplicate post"});
              }else{
                res.status(500).send({
                  message:
                    err.message || "Some error occurred while adding meme."
                });
              }
            
        })
      .catch(err => {
        res.status(404).send({ message:"Not found !"});
      });
}

// List all Memes from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
      Meme.find(condition).sort({$natural:-1}).limit(100)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while listing memes."
        });
      });
  };

// Get a single meme with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Meme.findById(id)
      .then(data => {
        if(!data)
          res.status(404).send({ message: "Meme with requested id : "+ id + " is not found !"});
        else
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({ message:"Not found !"});
      });
  };

// Update a meme by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    // console.log(req.body)
    // console.log(id)
    Meme.findByIdAndUpdate(id, req.body)
      .then(data => {
          // Validate request

          if (!req.body.caption) {
            res.status(400).send({ message: "Caption can not be empty!" });
            return;
          }

          if (!req.body.url) {
            res.status(400).send({ message: " Meme URL can not be empty!" });
            return;
          }
          else res.send({ message: "Meme updated successfully." });
      })
      .catch(err => {
        res.status(404).send({
          message: "Id "+id +" doesn't exist !!"
        });
      });
  };

// Delete a meme with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log("id "+ id)
    Meme.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: ` id=${id} , not found!`
          });
        } else {
          res.send({
            message: "Meme deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Invalid Id ,couldn't delete!!"
        });
      });
  };

// Delete all memes from the database.
exports.deleteAll = (req, res) => {
    Meme.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Memes are deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all memes."
        });
      });
  };

  