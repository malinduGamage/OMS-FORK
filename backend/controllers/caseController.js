const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllCases = async (req, res) => {
    const { orphanageid } = req.query;

    try {
        const rawCasesList = await prisma.cases.findMany({
            where: {
                child: {
                    orphanageid: orphanageid
                }
            },
            include: {
                child: {
                    select: {
                        name: true,
                        date_of_birth: true
                    }
                },
                users: { // Fetch parent details
                    select: {
                        username: true,
                        email: true
                    }
                },
                socialworker: { // Fetch social worker details (reference to users table)
                    select: {
                        users: {
                            select: {
                                username: true
                            }
                        }
                    }
                }
            }
        });

        const casesList = rawCasesList.map(caseItem => ({
            caseid: caseItem.caseid,
            childid: caseItem.childid,
            socialworkerid: caseItem.socialworkerid,
            parentid: caseItem.parentid,
            childName: caseItem.child.name,
            childDateOfBirth: caseItem.child.date_of_birth,
            socialWorkerName: caseItem.socialworker?.users?.username,
            parentName: caseItem.users?.username,
            parentEmail: caseItem.users?.email
        }));

        res.json({
            success: true,
            casesList: casesList
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching cases." });
    }
};



const createCase = async (req,res)=>{

    const{socialworkerid,parentid,childid} = req.body

    try {

        const newCase = await prisma.cases.create({
            data:{
                childid:childid,
                parentid:parentid,
                socialworkerid:socialworkerid
            }
        })

        

        res.json({success:true})
        
    } catch (error) {

        console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the case."
    });
        
    }
}





module.exports = {createCase , getAllCases}