const PORT = process.env.PORT ||4000
require('dotenv').config();
const express = require('express')
const app = express()

const {v4:uuid} = require('uuid')

const cors = require('cors')

const db = require('./config/dbConn')

const corsOptions = require('./config/corsOptions')
const credentials = require('./middleware/credentials')
const cookieParser = require('cookie-parser')

//whether the server allows cross-origin requests to include credentials like cookies, authorization headers
app.use(credentials)

//identify which origins can access and blcok others
app.use(cors(corsOptions))

//handle images
app.use(express.urlencoded({extended:false}))

app.use (express.json())

app.use(cookieParser())

//importing custom middleware

const verifyJWT = require('./middleware/verifyJWT')




//routes

app.use('/login',require('./routes/login'))

app.use('/register',require('./routes/register'))

app.use('/refresh',require('./routes/refresh'))


//for functiosn below we have re.roles an dreq.user as well automatically

app.use(verifyJWT)


app.use ('/orphanage',require('./routes/api/orphanages'))



app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error: "+error);
    }
})

