const bcrypt = require('bcrypt');
const db = require('../config/dbConn');

const handleNewUser = async (req,res)=>{

    const {username,password,telno,email}= req.body;

    if(!username||!password||!email||!telno) return res.status(400).json({ 'message': 'All fields are required.' })

        const duplicateResult = await db.query('SELECT * FROM users WHERE username=$1',[username])

        if(duplicateResult.rows.length>0) return res.status(409).json({'message':'User already exists'})

            try {

                const hashedPassword = await bcrypt.hash(password,10)

                const result = await db.query(
                    'UPDATE users SET username = $1, password = $2, telno = $3, refreshToken = $4 WHERE email = $5',
                    [
                        username,
                        hashedPassword,
                        telno,
                        'dummy',
                        email
                    ]
                );


                



                console.log(result.rows);
                res.status(201).json({ 'success': `New user ${username} created!` });
                
            } catch (error) {
                res.status(500).json({'message':error.message})
            }
}

module.exports = {handleNewUser}