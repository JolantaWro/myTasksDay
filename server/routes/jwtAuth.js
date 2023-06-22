const router = require("express").Router();
// const express = require("express");
// const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

//registering
router.post("/register", validInfo, async (req, res) => {
    try {
        const { email, name, password } = req.body;




        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }




        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);




        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]
          );

        const token = jwtGenerator(newUser.rows[0].user_id);





        res.json({token})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

//login route

router.post("/login", validInfo, async (req, res) => {
    try {
        //destructure
        const { email, password } = req.body;



        //check if user doesn't exist
        const user = await pool.query("SELECT * FROM userstable WHERE user_email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email is incorrect");
        }


        //check if incomming password is the same the database password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrec");
        }
        
        
        //give them the jwt token  

        const token = jwtGenerator(user.rows[0].user_id);

        res.json({token})
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

router.get("/is-verify", authorization, async(req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;