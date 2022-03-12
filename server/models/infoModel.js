const mongoose = require("mongoose")

const infoSchema = {
    matieres: Array,
    profs: Array,
    salles: Array,
    niveaux: Array
}
const info = mongoose.model("info", infoSchema)
module.exports = info;