const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { v4: uuidv4 } = require('uuid');

const createApplication = async (req, res) => {
  // Extracting data from the request
  const {
    firstname,
    lastname,
    gender,
    dob,
    nic,
    occupation,
    nationality,
    religion,
    nooffamilymembers,
    monthlyincome,
    additionalnote,
    homeaddress,
    city,
    province,
    postalcode,
    telphonenum,
    cellphonenum,
    emailaddress,
    genderofchild,
    reasonforfostering,
    specificneeds,
    additionalcomments,
    userId,
    username,
    ageRange,
  } = req.body;


  try {
    // Database call to create a new application
    const newApplication = await prisma.application.create({
      data: {
        applicationid: uuidv4(),
        userid: userId,
        username: username,
        createdat: new Date(),
        status: "Pending",
        emailaddress: emailaddress,
        genderofchild: genderofchild,
        agerange: ageRange,
      },
    });

    // Sending the response
    res.json({
      success: true,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the application.",
    });
  }
};


const getApplications = async (req, res) => {
  try {
    const applications = await prisma.application.findMany();

    res.json({
      success: true,
      applicationList:applications,
    });
  } catch (error) {
    console.error("Database query failed:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving the pending applications.",
    });
  }
};


const getChildren = async (req, res) => {
  const { agerange, gender } = req.body

  try {
      // Calculate the date ranges based on the agerange
      const currentDate = new Date()
      const maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - agerange[0]))
      const minDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - agerange[1]))

      // Fetch the children from the database
      const childrenList = await prisma.child.findMany({
          where: {
              gender: gender,
              date_of_birth: {
                  lte: maxDate,
                  gte: minDate,
              }
          },
          select: {
              childid: true,
              orphanageid: true,
              name: true,
              orphanage: {
                  select: {
                      orphanagename: true
                  }
              }
          }
      })

      res.json({
          success: true,
          children: childrenList
      })

  } catch (error) {
      console.error('Error fetching children:', error)
      res.status(500).json({ error: 'An error occurred while fetching children.' })
  }
}

const acceptApplication = async(req,res)=>{
  try {

    const {applicationid} = req.query

    const accepted = await prisma.application.update({
      where:{
        applicationid:applicationid
      },
      data:{
        status:'Accepted'
      }
    })

    res.json({success:true})
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while accepting application"
    });
    
  }
}


module.exports = {createApplication,getApplications,getChildren,acceptApplication};
