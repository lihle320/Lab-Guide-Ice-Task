import jwt from "jsonwebtoken"

const checkauth=(req,res, next)=>
{
    try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "this_secret_should_be_longer_than_it_is")
    next();
    }
    catch(error){
        res.status(401).json({
            message: "token invalid"
        });
    }

router.post("/upload", checkauth, async (req, res) => {

    let newDocument ={
    user: req.body.user,
    content: req.body.content,
    image: req.body.image
    };
        let collection = await db.collection("posts");
        let result = await collection.insertOne(newDocument);
        res.send(result).status (204);
});

router.patch("/:id", checkauth, async (req, res) => {

const query = {_id: new ObjectId(req.params.id)};
const updates = {
$set: {

name: req.body.name,

comment: req.body.comment
}
};

let collection = await db.collection("posts");
let result = await collection.updateOne(query, updates);

res.send(result).status(200);
});
}