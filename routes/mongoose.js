const router = require("express").Router();
const {Schema, model} = require("mongoose");

const mixschema = new Schema({
    Adelhyde:Number,
    Powdered_Delta:Number,
    Broson_Extract:Number,
    Flanergide:Number,
    Karmotrine:Number,
    On_the_rocks:String,
    Mixed:String,
});

const cocktailschema = new Schema({
    drink:{type:String, required:true},
    price:{type:Number, required:true},
    flavour:{type:String, required:true},
    type:{type:String},
    alchoholic:{type:String},
    Parts:[mixschema],
    })

const cocktailModel = model("cocktail", cocktailschema);

router.get("/getAll", (req, res, next) => {
    cocktailModel.find({}).then(cocktail => {
        res.status(200).json(cocktail)
    }).catch(next)
})

router.put("/create", (req, res, next) => {
    cocktailModel.create(req.body).then(cocktail => {
        res.status(201).json(cocktail)
    }).catch(next)

})

router.post("/update/:id", (req, res, next) => {
    cocktailModel.findByIdAndUpdate({"_id":req.params.id}, req.body).then((Old) =>{
        cocktailModel.findById({"_id":req.params.id}).then((New) => {
            res.status(200).json({Old, New})
        })
     }).catch(next) 
})

router.delete("/delete/:id",(req, res) => {
		cocktailModel.deleteOne({"_id": req.params.id }).then((r)=>{
            res.status(204).json(r)
            res.send({error:"cocktail has been deleted"})
        }).catch((q)=>{
            res.status(404)
            res.send({ error: "cocktail doesn't exist!" })
        })
})


module.exports = router;