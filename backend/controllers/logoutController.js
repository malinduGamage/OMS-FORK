const db = require("../config/dbConn");

const handleLogout = async(req,res)=>{

    const cookies = req.cookies

    if(!cookies.jwt) return res.senStatus(204)

    const refreshToken = cookies.jwt
    
    
    const founduser = await db.query('SELECT * FROM users WHERE refreshtoken = $1',[refreshToken])

    if (!founduser.rows.length>0){
        res.clearCookie('jwt',{ httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204);
    }

    userId = founduser.rows[0].userid

    const updateToken = await db.query('UPDATE users SET refreshtoken = $1 WHERE userid = $2',['',userId])

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);


}

module.exports = { handleLogout }