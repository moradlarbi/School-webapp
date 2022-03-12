const mongoose = require("mongoose")

const classeSchema = {
    nom: String,
    matieres: Array,
    profs: Array,
    salles: Array,
    events: Array
}
const classe = mongoose.model("classe", classeSchema)
module.exports = classe;