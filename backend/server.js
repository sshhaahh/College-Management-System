const express=require("express")
const dbConnection=require("./config/Database")
const app=express();
const PORT=3000;
const Routes=require('./routes/Routes');
const cors=require('cors')
app.get("/api", (req, res) => {
    res.send("Welcome to the API!");
  });

app.use(cors());
app.use(express.json());
// ---------------------Database

dbConnection();

// ---------------------Routes


app.use('/api',Routes)


app.listen(PORT,()=>{
    console.log(`Server run at port ${PORT}`)
})

