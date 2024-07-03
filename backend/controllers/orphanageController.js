const db = require("../config/dbConn");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllOrphanage = async (req, res) => {

  try {

    const orphanageList = await prisma.orphanage.findMany();

    res.json({
      success: true,
      orphanageList: orphanageList
    })

  } catch (error) {


    console.error('Database query failed:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching orphanages.'
    });


  }




}

const addOrphanage = async (req, res) => {
  const { orphanagename, address, capacity, telno, head_email, district } = req.body;

  try {


    // Insert new head into users table
    const newHead = await prisma.users.create({
      data: {
        email: head_email,
        roles: { 'User': 1010, 'Head': 1910, 'SocialWorker': 2525 },
      }
    });
    const newHeadId = newHead.userid;

    // Insert new orphanage into orphanage table
    const newOrphanage = await prisma.orphanage.create({
      data: {
        orphanagename: orphanagename,
        headid: newHeadId,
        address: address,
        capacity: +capacity, // Convert to integer otherwise query will fail
        telno: +telno, // Convert to integer otherwise query will fail
        head_email: head_email,
        //district: district -- was not in the original database schema
      }
    });

    res.json({
      success: true,
      orphanage: newOrphanage
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the orphanage."
    });
  }
};

const getOrphanageByHead = async (req, res) => {
  const { userId } = req;

  try {
    const orphanage = await prisma.orphanage.findUnique({
      where: {
        headid: userId,
      },
    });

    if (!orphanage) {
      return res.status(404).json({ error: 'Orphanage not found for the given head ID.' });
    }

    const orphanageId = orphanage.orphanageid;

    res.json({ orphanageId });
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'An error occurred while fetching the orphanage.' });
  }
};


module.exports = {
  addOrphanage
  , getOrphanageByHead,
  getAllOrphanage
}