const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getChild = async (req, res) => {
    const childid = req.params.childid

    try {
        const child = await prisma.child.findUnique({
            where: {
                childid: childid
            }
        })

        res.json({
            success: true,
            child: child
        })

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching child.'
        });
    }

}

const getOrphanageChildren = async (req, res) => {
    try {
        const childrenList = await prisma.child.findMany({
            where: {
                orphanageid: req.params.orphanageid
            },
            select: {
                childid: true,
                name: true,
                date_of_birth: true,
                gender: true
            }
        });
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
    const { orphanageid, name, date_of_birth, gender, nationality, religion, medicaldetails, educationaldetails } = req.body;
    try {//database call
        const newChild = await prisma.child.create({
            data: {
                orphanageid: orphanageid,
                name: name,
                date_of_birth: new Date(date_of_birth),
                gender: gender,
                nationality: nationality,
                religion: religion,
                medicaldetails: medicaldetails,
                educationaldetails: educationaldetails
            }
        })
        //sending response
        res.json({
            success: true,
            data: {
                childid: newChild.childid,
                name: newChild.name,
                date_of_birth: newChild.date_of_birth,
                gender: newChild.gender
            }
        })

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding child.'
        });
    }
}

const updateChild = async (req, res) => {
    const childid = req.params.childid;
    const { name, date_of_birth, gender, religion, nationality, medicaldetails, educationaldetails } = req.body;
    try {
        await prisma.child.update({
            where: {
                childid: childid
            },
            data: {
                name: name,
                date_of_birth: new Date(date_of_birth),
                gender: gender,
                nationality: nationality,
                religion: religion,
                medicaldetails: medicaldetails,
                educationaldetails: educationaldetails
            }
        })
        res.json({ success: true })
        console.log('updated child successfully')

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating child.'
        });
    }
}





module.exports = { getOrphanageChildren, addChild, getChild, updateChild }