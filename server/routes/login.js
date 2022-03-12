const express = require("express")
const router = express.Router()

const user = require("../models/userModel")
let x ={
    err : "",
    id : "",
    type: ""
}
router.post("/",(req,res) => {
    // user.deleteMany({}, (err,res)=>{

    // })
    
    const email = req.body.email
    const pass =req.body.pass
    user.findOne({ email: email })
    .then(res => {
        if (res !== null){
            x.err = ""
            x.id = res._id
            x.type = res.type
            x.nom = res.nom
            x.prenom = res.prenom
            x.email = res.email
            x.pass = res.pass
            x.matiere = res.matiere
            x.niveau = res.niveau
            x.tel = res.tel
            x.events = res.events
            
        }
        else {
            //console.log("resss is: "+res)
            x.err = "L'email et ou le mot de pass est faux"

        }
        
    })
      

})
router.get("/",(req,res) => {
    res.json(x)
})

module.exports = router