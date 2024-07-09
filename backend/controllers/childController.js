const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ROLES_LIST = require('../config/roles_list')

const getChild = async (req, res) => {
    const childid = req.params.childid

    try {
        console.log(childid)
        const child = await prisma.child.findUnique({
            where: {
                childid: childid
            }
        })

        if (!child) return res.sendStatus(404);
        //check if user is authorized to view child
        if (!req.roles.includes(ROLES_LIST.Admin) && ((!req.orphanageid) || (child.orphanageid !== req.orphanageid))) return res.sendStatus(401);

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
        const orphanageid = req.params.orphanageid;
        //check if user is authorized to view child
        if (!req.roles.includes(ROLES_LIST.Admin) && (!req.orphanageid) || (req.orphanageid !== orphanageid)) return res.sendStatus(401);

        const childrenList = await prisma.child.findMany({
            where: {
                orphanageid: orphanageid
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
    //check if user is authorized to add child
    if ((!req.orphanageid) && (orphanageid !== req.orphanageid)) return res.sendStatus(401);

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
        const child = await prisma.child.findUnique({
            where: {
                childid: childid
            },
            select: { orphanageid: true }
        })

        if (!child) return res.sendStatus(404);
        //check if user is authorized to update child
        if ((!req.orphanageid) || (child.orphanageid !== req.orphanageid)) return res.sendStatus(401);

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