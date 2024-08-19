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

const getCaseById = async (req, res) => {
    try {
        const { caseid } = req.query;

        const rawCaseDetails = await prisma.cases.findUnique({
            where: {
                caseid: caseid
            },
            include: {
                child: true, 
                users: true, 
                socialworker: {
                    include: {
                        users: true 
                    }
                }
            }
        });
        
       
        const caseItem = {
            caseid: rawCaseDetails.caseid,
            child: rawCaseDetails.child,
            parent: rawCaseDetails.users, 
            socialworker: rawCaseDetails.socialworker.users 
        };
        



        res.status(200).json(caseItem);

    } catch (error) {
        console.error("Error fetching case details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserCases = async (req, res) => {
    const {userId} = req;

    try {

        

        const userCases = await prisma.cases.findMany({
            where: {
                parentid: userId
            },
            select: {
                
                caseid:true,
                
            }
        });

        res.json({
            success: true,
            userCases: userCases
        });
        
    } catch (error) {
        console.error("Error fetching user cases:", error); // Log the error for debugging
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching user cases."
        });
        
    }
}





module.exports = {createCase , getAllCases,getCaseById,getUserCases}