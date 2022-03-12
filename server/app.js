const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const bodyParser = require("body-parser")
app.use(cors())
//connect db
mongoose.connect("mongodb+srv://morad:password@cluster0.9wt8a.mongodb.net/schooldb")

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));


const userRoute = require("./routes/user.js")
const loginRoute = require("./routes/login")
const initialiseRoute = require("./routes/initialise")
const niveauxRoute = require("./routes/niveaux")

app.use("/users",userRoute)
app.use("/login",loginRoute)
app.use("/init",initialiseRoute)
app.use("/niveaux",niveauxRoute)

app.listen("8080")