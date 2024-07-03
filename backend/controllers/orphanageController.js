const db = require("../config/dbConn");
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');


const getAllOrphanage = async(req,res)=>{

  try {

    const orphanageList = await db.query('SELECT * FROM orphanage')

    res.json({success:true,
      orphanageList:orphanageList.rows
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
  const { orphanagename, address, capacity, telno, head_email,district } = req.body;

  try {


  //   let config = {
  //     service : 'gmail',
  //     auth : {
  //         user: process.env.MYEMAIL,
  //         pass: process.env.MYPASSWORD
  //     }
  // }

  // let transporter = nodemailer.createTransport(config);

  // let MailGenerator = new Mailgen({
  //     theme: "default",
  //     product : {
  //         name: "Mailgen",
  //         link : 'https://mailgen.js/'
  //     }
  // })

  // let response = {
  //     body: {
  //         name : "Daily Tuition",
  //         intro: "Your bill has arrived!",
  //         table : {
  //             data : [
  //                 {
  //                     item : "Nodemailer Stack Book",
  //                     description: "A Backend application",
  //                     price : "$10.99",
  //                 }
  //             ]
  //         },
  //         outro: "Looking forward to do more business"
  //     }
  // }

  // let mail = MailGenerator.generate(response)

  // let message = {
  //     from : process.env.MYEMAIL,
  //     to : head_email,
  //     subject: "Place Order",
  //     html: mail
  // }

  // transporter.sendMail(message)
   

    // Insert new head into users table
    const newHead = await db.query(
      'INSERT INTO users (email, roles) VALUES ($1, $2) RETURNING userid',
      [head_email, JSON.stringify({ 'User': 1010, 'Head': 1910, 'SocialWorker': 2525 })]
    );

    
    const newHeadId = newHead.rows[0].userid;

    // Insert new orphanage into orphanage table
    const newOrphanage = await db.query(
      'INSERT INTO orphanage (orphanagename, headid, address, capacity, telno, head_email,district) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *',
      [orphanagename, newHeadId, address, capacity, telno, head_email,district]
    );

   
    res.json({
      success: true,
      orphanage: newOrphanage.rows[0]
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
    const orphanageResult = await db.query('SELECT * FROM orphanage WHERE headid=$1', [userId]);

    if (orphanageResult.rows.length === 0) {
      return res.status(404).json({ error: 'Orphanage not found for the given head ID.' });
    }

    const orphanageId = orphanageResult.rows[0].orphanageid;

    res.json({ orphanageId });
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'An error occurred while fetching the orphanage.' });
  }
};


module.exports ={addOrphanage
  ,getOrphanageByHead,
  getAllOrphanage
}