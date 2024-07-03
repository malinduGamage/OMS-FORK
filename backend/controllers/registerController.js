const bcrypt = require('bcrypt');
const db = require('../config/dbConn');
const sendEmail = require('../utils/sendEmail')
const jwt = require('jsonwebtoken')

const handleNewUser = async (req, res) => {
    const { username, password, telno, email } = req.body;

    // Validate required fields
    if (!username || !password || !email || !telno) {
        return res.status(400).json({ 'message': 'All fields are required.' });
    }

    try {
        // Check if user already exists
        const findUser = await db.query('SELECT * FROM users WHERE email=$1', [email]);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const verifyToken = jwt.sign(
            { "email": email},
            process.env.VERIFY_TOKEN_SECRET,
            { expiresIn: '365d' }
        );

        let result;
        if (findUser.rows.length === 0) {

           
            // Insert new user
            result = await db.query(
                'INSERT INTO users (username, password, email, telno, refreshtoken, roles,verifytoken) VALUES ($1, $2, $3, $4, $5, $6,$7)',
                [
                    username,
                    hashedPassword,
                    email,
                    telno,
                    'dummy', // Consider handling refresh token properly
                    JSON.stringify({ 'User': 1010 }),
                    verifyToken
                ]
            );

           

           

           
            res.status(201).json({ 'success': `New user ${username} created!` });
        } else {
            // Update existing user
            result = await db.query(
                'UPDATE users SET username = $1, password = $2, telno = $3, refreshtoken = $4 ,verifytoken=$5 WHERE email = $6',
                [
                    username,
                    hashedPassword,
                    telno,
                    'dummy', 
                    verifyToken,
                    email,

                ]
            );
            res.status(200).json({ 'success': `User ${username} updated!` });
        }


        const newUser = await db.query('SELECT * FROM users WHERE email=$1',[email])

        const newUserId = newUser.rows[0].userid


        const url = `${process.env.BASE_URL}${newUserId}/verify/${verifyToken}`

        await sendEmail(email,"Verify Email",url)





        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

module.exports = { handleNewUser };
