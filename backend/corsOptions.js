const allowedOrigins = require('./allowedOrigins')

const corsOptions ={
    origin:(origin,callback)=>{
        //there is no origin in server to server
        if(allowedOrigins.includes(origin)||!origin){
            callback(null,true)
            //null indicated no error and true indicated access to the server form that origin is allowed
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    },

    credentials:true, //disables sending credentials (such as cookies or HTTP authentication)
    optionSuccessStatus:200
    
};

module.exports =corsOptions