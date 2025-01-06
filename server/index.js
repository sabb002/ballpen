const cors = require("cors");
const express = require("express");
const mongodb = require("./db/database");
const postRouter = require("./routes/posts.route");
const userRouter = require("./routes/users.route");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({origin:"*"}));


async function runServer(){
    try{
        await mongodb.connect();
        
        app.get("/", (req, res)=> res.status(200).send("🔥It's working, sir."))
        app.use("/posts", postRouter);
        app.use("/users", userRouter);
        app.get("/*", (req, res)=> res.status(404).send("What are you looking for exactly?") )

        app.listen(PORT,()=>console.log(`⚡http://localhost:${PORT}`));
    }
    catch(err){
        console.log(err);
    }
}

runServer();