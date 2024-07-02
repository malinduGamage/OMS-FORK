const db = require("../config/dbConn");

const addSocialWorker = async (req, res) => {
    const { email, orphanageId } = req.body;
  
    try {
     
  
      // Insert new head into users table
      const newSocialWorker = await db.query(
        'INSERT INTO users (email, roles) VALUES ($1, $2) RETURNING userid',
        [email, JSON.stringify({ 'User': 1010, 'SocialWorker': 2525 })]
      );
  
      
      const newSocialWorkerId = newSocialWorker.rows[0].userid;

      
  
      // Insert new orphanage into orphanage table
      const newSocialWorkerRole = await db.query(
        'INSERT INTO socialworker (socialworkerid,orphanageid) VALUES ($1, $2) RETURNING *',
        [newSocialWorkerId,orphanageId]
      );
  
     
      res.json({
        success: true,
       
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred while adding the orphanage."
      });
    }
  };

  const getOrphanage= async(req,res)=>{

    const {userId} = req;

    try {

      const orphanage = await db.query('SELECT * FROM socialworker WHERE socialworkerid=$1',[userId])

      const orphanageId = orphanage.rows[0].orphanageid

      res.json({orphanageId})
      
    } catch (error) {
      console.error('Database query failed:', error);
    res.status(500).json({ error: 'An error occurred while fetching the orphanage.' });
      
    }

  }

  module.exports ={addSocialWorker,getOrphanage
  }
  