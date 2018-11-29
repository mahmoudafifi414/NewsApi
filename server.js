import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import {NewsRouter} from "./routes/NewsRoutes";
//take instance of express
const app = express()
//connect the DB (mongodb)
mongoose.connect("mongodb://localhost/NewsApi", {useNewUrlParser: true});
//use body parser
app.use(bodyParser.json())
//create instance of News Routes
const newsRoutes = new NewsRouter(app)
app.listen(3000, () => {
    console.log('connected')
})