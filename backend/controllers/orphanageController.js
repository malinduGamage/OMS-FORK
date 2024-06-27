const db = require("../config/dbConn");

const addOrphanage = async (req, res) => {
  const { orphanagename, address, capacity, telno, head_email } = req.body;

  try {
   

    // Insert new head into users table
    const newHead = await db.query(
      'INSERT INTO users (email, roles) VALUES ($1, $2) RETURNING userid',
      [head_email, JSON.stringify({ 'User': 1010, 'Head': 1910, 'SocialWorker': 2525 })]
    );

    
    const newHeadId = newHead.rows[0].userid;

    // Insert new orphanage into orphanage table
    const newOrphanage = await db.query(
      'INSERT INTO orphanage (orphanagename, headid, address, capacity, telno, head_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [orphanagename, newHeadId, address, capacity, telno, head_email]
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


module.exports ={addOrphanage}