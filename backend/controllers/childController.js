const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllChildren = async (req, res) => {

    try {
        const childrenList = await prisma.children.findMany();
        res.json({
            success: true,
            childrenList: childrenList
        })

    } catch (error) {

        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching children.'
        });
    }
}

const addChild = async (req, res) => {
    //extracting data from request
    const { orphanageid, name, date_of_birth, gender, nationality, religion, medicaldetails, educationdetails } = req.body;
    try {//database call
        const newChild = await prisma.children.create({
            data: {
                orphanageid: orphanageid,
                name: name,
                date_of_birth: date_of_birth,
                gender: gender,
                nationality: nationality,
                religion: religion,
                medicaldetails: medicaldetails,
                educationdetails: educationdetails
            }
        })
        //sending response
        res.json({
            success: true,
            message: 'Child added successfully'
        })

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding child.'
        });
    }
}

module.exports = { getAllChildren, addChild }