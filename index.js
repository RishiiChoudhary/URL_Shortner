const express = require('express')
const { connectToMongoBD } = require('./connect')
const app = express();
const PORT = 8001;
const URL = require('./models/url')
const path = require('path')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly,checkAuth} = require('./middlewares/auth')

//Router
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRoute')
const userRoute = require('./routes/user')

//connection
connectToMongoBD('mongodb://127.0.0.1:27017/short-url')
.then(()=> console.log('Connection Successfull MongoDB'))
.catch((err)=> {
    console.log(err)
})

//views
app.set("view engine","ejs")
app.set("views", path.resolve("./views"))

//Middlewares
app.use(express.json())   //json support rendering
app.use(express.urlencoded({ extended : false}))    //for url input support
app.use(cookieParser());

//routes
app.use('/url',restrictToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);
 
app.get('/url/:shortId', async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
    {
        shortId
    },
    {
    $push: {
            visitHistory: {timestamp: Date.now()}
         }
    })
    res.redirect(entry.redirectURL)
})


app.listen(PORT, ()=>{
    console.log(`Server Connected on PORT ${PORT}`)
})