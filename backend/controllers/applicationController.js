const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createApplication = async(req,res)=>{

    const applicationData = {
        userId :'',
        childId:'',
        
    }

    try {
        
    } catch (error) {
        
    }

}

const getApplications = async (req, res) => {
    try {
        const { orphanageid } = req.query // Use req.query if it's from query params
        // const { orphanageid } = req.params // Use req.params if it's from route params

        const applicationList = await prisma.application.findMany({
            where: {
                child: {
                    orphanageid: orphanageid
                }
            },
            include: {
                child: true
            }
        });

        res.json({
            success: true,
            applicationList: applicationList
        });

    } catch (error) {
        console.error('Database query failed:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching applications.'
        });
    }
};



module.exports = {getApplications}