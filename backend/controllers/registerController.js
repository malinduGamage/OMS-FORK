const bcrypt = require('bcrypt');
const db = require('../config/dbConn');

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

        let result;
        if (findUser.rows.length === 0) {
            // Insert new user
            result = await db.query(
                'INSERT INTO users (username, password, email, telno, refreshtoken, roles) VALUES ($1, $2, $3, $4, $5, $6)',
                [
                    username,
                    hashedPassword,
                    email,
                    telno,
                    'dummy', // Consider handling refresh token properly
                    JSON.stringify({ 'User': 1010 })
                ]
            );
            res.status(201).json({ 'success': `New user ${username} created!` });
        } else {
            // Update existing user
            result = await db.query(
                'UPDATE users SET username = $1, password = $2, telno = $3, refreshtoken = $4 WHERE email = $5',
                [
                    username,
                    hashedPassword,
                    telno,
                    'dummy', // Consider handling refresh token properly
                    email
                ]
            );
            res.status(200).json({ 'success': `User ${username} updated!` });
        }

        console.log(result.rows);
    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
};

module.exports = { handleNewUser };
