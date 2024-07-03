const jwt = require('jsonwebtoken');
const db = require('../config/dbConn');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ 'message': 'there is no jwt cookie' })

    const refreshToken = cookies.jwt;

    const user = await prisma.users.findUnique({
        where: {
            refreshtoken: refreshToken,
        },
    });

    if (!user) return res.status(403).json({ 'message': 'There is no user with this ref token' })

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username) res.sendStatus(403)

            const roles = Object.values(user.roles)

            const accessToken = jwt.sign(
                {
                    'UserInfo': {
                        "userId": user.userid,
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15min' }
            );

            res.json({ accessToken })
        }
    )

}

module.exports = { handleRefreshToken }