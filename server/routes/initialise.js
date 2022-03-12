const express = require("express")
const router = express.Router()

const info = require("../models/infoModel")
//  const newInfo = new info({
//      matieres: ["maths","physique","arabe","sport","islamique"],
//      profs: ["chergou","aries","benmalek","sahad"],
//      salles: ["cp1","cp2","ap1","a4","cyber"],
//      niveaux: ["1CP","2CP","1CS"]
//  })
//  newInfo.save()
router.get("/",(req,res) => {
    info.findOne()
    .then(arr => {
        res.json(arr)
    })
})

module.exports = router