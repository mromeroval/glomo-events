const express =  require('express');
const router = express.Router();
const events = require('../db/events.json');
const sqlite3 = require('sqlite3');
const path = require('path');


// SQLite DB Connection
const dbPath = path.resolve(__dirname, '../db/events.db')
let db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
      console.log('Connected to the events database.');
  }
});


// Fetch the events from the JSON file and store them in the database
events.forEach(event => {
    let sql = "INSERT OR REPLACE INTO events(" +
                "awayName, " +
                "createdAt, " +
                "homeName, " +
                "event_group, " +
                "id, " +
                "name, " +
                "objectId, " +
                "sport, " +
                "country, " +
                "state) VALUES ( '" +
                event.awayName + "','" +
                event.createdAt + "','" +
                event.group + "','" +
                event.homeName + "'," +
                event.id + ",'" +
                event.name + "','" +
                event.objectId + "','" +
                event.sport + "','" +
                event.country + "','" +
                event.state + "')";

    db.run(sql, function(err) {
        if (err) {
          return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
      });
    });
    db.close();


// EVENTS API

// Get all events
router.get('/',(req,res) => {
    res.json(events);
})

// Gets individual event
router.get('/:id', (req, res) => {
    const found = events.some(event => event.id === parseInt(req.params.id))
    if (found){
        res.json(events.filter(event => event.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg:`Event with the id of ${req.params.id} doesn't exist`});
    }
});

module.exports = router;
