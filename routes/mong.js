const router = require("express").Router();
const {Schema, model} = require("mongoose");

const cocktailSchema = new Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    taste:{type:String, required:true},
    price:{type:String},
    type:{type:String}
    })

const cocktailmodel = model("cocktailSchema");

router.get("/getAll", (req, res, next) => {
 cocktailmodel.find({}).then(cocktail => {
        res.status(200).json(cocktail)
    }).catch(next)
})

router.put("/create", (req, res, next) => {
 cocktailmodel.create(req.body).then(cocktail => {
        res.status(201).json(cocktail)
    }).catch(next)

})

router.post("/update/:id", (req, res, next) => {
 cocktailmodel.findByIdAndUpdate({"_id":req.params.id}, req.body).then((Old) =>{
     cocktailmodel.findById({"_id":req.params.id}).then((New) => {
            res.status(200).json({Old, New})
        })
     }).catch(next) 
})

router.delete("/delete/:id",(req, res) => {
	 cocktailmodel.deleteOne({"_id": req.params.id }).then((r)=>{
            res.status(204).json(r)
            res.send({error:"cocktail has been deleted"})
        }).catch((q)=>{
            res.status(404)
            res.send({ error: "cocktail doesn't exist!" })
        })
})


module.exports = router;