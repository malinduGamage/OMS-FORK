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



module.exports = {createApplication};
