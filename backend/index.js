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

app.get('/:id/verify/:token',async(req,res)=>{
    try {

        const user = await db.query('select * FROM users WHERE userid=$1',[req.params.id])

        if(!user.rows.length>0) return res.status(400).json({"message":"Invalid link"})


         if(user.rows[0].verifytoken = null) 
            return res.status(400).send({ message: "Invalid link" });

         const updateVerify = await db.query('UPDATE users SET verified = $1 WHERE userid = $2',[true,req.params.id]) 

         res.status(200).send({ message: "Email verified successfully" });


        
    } catch (error) {

        res.status(500).send({ message: "Internal Server Error" });
        
    }
})


//for functiosn below we have re.roles an dreq.user as well automatically

app.use(verifyJWT)


app.use ('/orphanage',require('./routes/api/orphanages'))

app.use('/socialworker',require('./routes/api/socialworker'))



app.listen(PORT,(error)=>{
    if(!error){
        console.log(`Server running on port ${PORT}`);
    }
    else{
        console.log("Error: "+error);
    }
})

