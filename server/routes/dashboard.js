const router = require("express").Router();
const authorization = require("../middleware/authorization");
const pool = require("../db");

// router.get("/", authorization, async (req, res) => {
//   try {
//     const user = await pool.query(
//       "SELECT user_name FROM userstable WHERE user_id = $1",
//       [req.user.id] 
//     ); 
    

//     res.json(user.rows[0])
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });


//all todos and name

router.get("/", authorization, async (req, res) => {
  try {
    // const user = await pool.query(
    //   "SELECT user_name FROM users WHERE user_id = $1",
    //   [req.user.id]
    // );

    const user = await pool.query(
      "SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});


module.exports = router;