const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES//
//create an entry

app.post("/entries", async (req,res) => {
    try {
        const { entry_name, quantity } = req.body;
        const newEntry = await pool.query("INSERT INTO shoppinglist (entry_name, quantity) VALUES($1, $2) RETURNING *", 
            [entry_name, quantity]);
        
            res.json(newEntry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all entry

app.get("/entries", async(req,res) => {
    try {
        const allEntries = await pool.query("SELECT * FROM shoppinglist");
        res.json(allEntries.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get an entry

app.get("/entries/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const entry = await pool.query("SELECT * FROM shoppinglist WHERE entry_id = $1", [id]);

        res.json(entry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//update an entry

app.put("/entries/:id", async (req,res) => {
    try {
        const { id } = req.params;
        const { entry_name, quantity } = req.body;
        const updateEntry = await pool.query(
            "UPDATE shoppinglist SET entry_name = $1, quantity = $2 WHERE entry_id = $3",
            [entry_name, quantity, id]
        );
        res.json({ message: `Entry with ID ${id} was updated` });   
            
    } catch (err) {
        console.error(err.message);
    }
});

//delete an entry

app.delete("/entries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteEntry = await pool.query(
            "DELETE FROM shoppinglist WHERE entry_id = $1", [id]
        );
        res.json({ message: `Entry with ID ${id} was deleted`}); 

    } catch (err) {
        console.log(err.message);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});

