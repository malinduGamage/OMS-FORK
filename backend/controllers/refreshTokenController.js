const jwt = require('jsonwebtoken');
const db = require('../config/dbConn');


const handleRefreshToken = async (req,res)=>{
    const cookies = req.cookies;

    if(!cookies?.jwt) return res.status(401).json({'message':'there is no jwt cookie'})

        const refreshToken = cookies.jwt;


        const userResult = await db.query('SELECT * FROM users WHERE refreshtoken=$1',[refreshToken])

        if(!userResult.rows.length>0) return res.status(403).json({'message':'There is no user with this ref token'})

        const user = userResult.rows[0];

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if(err||user.username!==decoded.username) res.sendStatus(403)

                    const roles = Object.values(user.roles)

                    const accessToken = jwt.sign(
                        {
                            'UserInfo':{
                                "username":decoded.username,
                                "roles":roles
                            }
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn:'15min'}
                    );

                    res.json({accessToken})
            }
        )





}

module.exports = {handleRefreshToken}