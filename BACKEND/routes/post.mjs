import db from "../db/conn.mjs"
import express from "express";
import { ObjectId } from "mongodb";


const router = express.Router();

router.get("/",async(req, res)=>{
    let collection = await db.collection("posts");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);


})

router.post("/upload", async (req, res) => {
    let newDocument = {
    content: req.body.content,
    user: req.body.user, 
    image: req.body.image 
};
    let collection = await db.collection("posts");
    let result= await collection.insertOne (newDocument);
    res.send(result).status (204); 
});

//Update a record by id

router.patch("/:id", async (req, res) => { 
    const query = { _id: new ObjectId(req.params.id)};
    const updates ={
        $set: {
            name: req.body.name, 
            comment: req.body.comment
        }
    };

    let collection  = await db.collection("posts"); 
    let result = await collection.updateOne (query, updates);

        res.send(result).status(200); });

// Gets a single record by id 
    router.get("/:id", async (req, res) => { 
        let collection = await db.collection("posts");
         let query = {_id: new ObjectId(req.params.id)};
          let result = await collection.findOne(query);

        if (Iresult) res.send("Not found").status(404); 
        else res.send(result).status(200);
        });

// Delete a record

router.delete("/:id", async (req, res) => { 
    const query ={id: new ObjectId(req.params.id)};

const collection = db.collection("posts"); 
let result = await collection.deleteOne(query);

res.send(result).status(200);
});
