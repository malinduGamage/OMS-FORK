const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addStaff = async (req, res) => {
    const { email, orphanageId } = req.body;
    try {
        //trasaction to create new staff and add to staff table
        await prisma.$transaction(async (prisma) => {
            const newStaff = await prisma.users.create({
                data: {
                    email: email,
                    roles: { 'User': 1010, 'Staff': 5528 }
                },
            });

            await prisma.staff.create({
                data: {
                    staffid: newStaff.userid,
                    orphanageid: orphanageId
                },
            });

            console.log('Created new staff');
            res.json({ success: true })
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the staff."
        });
    }
}

module.exports = { addStaff };