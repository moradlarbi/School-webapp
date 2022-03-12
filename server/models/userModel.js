const mongoose = require("mongoose")

const userSchema = {
    nom: String,
    prenom: String,
    email: String,
    pass: String,
    tel: String,
    type: String,
    events: Array,
    niveau: String,
    matiere: String,
}
const user = mongoose.model("user", userSchema)
module.exports = user;