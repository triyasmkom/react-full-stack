const express =  require("express")
const app =  express()

const db = require("./models")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter)
app.use("/", (req, res)=>{
    res.send("Hello world")
})

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server running on port 3001");
        
    })
})
