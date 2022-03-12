const express = require("express")
const { events } = require("../models/classModel")
const router = express.Router()

const niveau = require("../models/classModel")
const user = require("../models/userModel")

// const nvNiveau = new niveau({
//     nom: "1CP",
//     matieres: ["maths","arabe"],
//     profs: ["aries","benmalek"],
//     salles: ["ap1","a4",],
//     events: []
// })
// const nvNiveau2 = new niveau({
//     nom: "2CP",
//     matieres: ["maths","sport","islamique"],
//     profs: ["chergou","sahad"],
//     salles: ["cp1","cp2"],
//     events: []
// })
// nvNiveau.save()
// nvNiveau2.save()
router.get("/class",(req,res) => {
    const no = req.param("nom")
    niveau.findOne({
        nom: no
    })
    .then(el => {
        res.json(el)
    })

})
router.post("/save",async (req, res) => {
    const no = req.body.nom
    const arr = req.body.arr
    // niveau.findOne({
    //     nom: no
    // }).then(async (el) => {
        
    // })
    const doc = await niveau.updateOne({ nom: no},{ $set: { 
        events: arr
    } })
    const utilisateurs = await user.updateMany({ niveau: no},{ $set: { 
        events: arr
    } })
    arr.forEach(async (el) => {
        const profs = user.findOne({ nom: el.extendedProps.prof })
        .then((ens) => {
            if (ens !== null){
                if (!ens.events.includes(el)){
                    ens.events.push(el)
                    ens.save()
                }
            }
            
            
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
})

router.get("/",(req,res) => {
    niveau.find()
    .then(arr => {
        res.json(arr)
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post("/",  (req,res) => {
    const niveaux = req.body
    niveaux.forEach(async (n) => {
        if (n._id === undefined){
            const nvNiveau = new niveau({
                nom: n.nom,
                matieres: n.matieres,
                profs: n.profs,
                salles: n.salles,
                events: n.events
            })
            nvNiveau.save()
        }
        else {
            const doc = await niveau.updateOne({ _id: n._id},{ $set: { nom: n.nom,
            salles: n.salles,
            matieres: n.matieres,
            profs: n.profs 
        } }) 

        }
    } )
})

module.exports = router