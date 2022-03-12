const express = require("express")
const router = express.Router()
const user = require("../models/userModel")
const info = require("../models/infoModel")

let x = {
    err: "",
    id: '',
    type: ""
};

router.post("/",(req,res) => {
    // user.deleteMany({}, (err,res)=>{

    // })
    console.log("debut")
    const nom = req.body.nom
    const prenom = req.body.prenom
    const type = req.body.type
    const niveau = req.body.niveau
    const matiere = req.body.matiere
    const email = req.body.email
    const tel = req.body.tel
    const pass =req.body.pass
    const pass2 = req.body.pass2
    
    if (pass !== pass2){
        x.err = "Vous devez entrer un mot de passe identique"
        
    }
    else {
        let b = false;
        user.findOne({ email: email })
        .then(arr => {
            if (arr !== null){
                console.log("array is: "+arr)
                x.err = "Ce mail existe deja"
            }
            else {
                x.err = ""
            }
            
        })
        .catch((err) => {
            console.log(err)
        })

    }
    if (x.err === ""){
        
        const newuser = new user({
            nom,
            prenom,
            type,
            niveau,
            matiere,
            email,
            tel,
            pass,
            pass2
        })
        newuser.save()
        .then(res => {
            if (type === "prof"){
                info.findOne()
                .then(el => {
                    el.profs.push(nom)
                    el.save()
                })
            }
            x.id = res._id  
            x.type = res.type
            x.nom = res.nom
            x.prenom = res.prenom
            x.email = res.email
            x.pass = res.pass
            x.matiere = res.matiere
            x.niveau = res.niveau
            x.tel = res.tel
            console.log("created x: "+x.id + x.err + x.type)
        })
        .catch((err) => {
            console.log(err)
        })
        
        
        
    }  

})
router.get("/",(req,res) => {

    res.json(x)
})


module.exports = router