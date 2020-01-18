const express =  require('express');
const router = express.Router();
const events = require('../db/events.json');
const sqlite3 = require('sqlite3');
const path = require('path');


// SQLite DB Connection
const dbPath = path.resolve(__dirname, '../db/events.db')
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
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


// EVENTS API

// Get all events
router.get('/', (req, res) => {
    let sql = 'SELECT DISTINCT awayName, homeName, event_group, id, name, sport, country, state FROM events ORDER BY event_group';
        db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        } else {
            let response = [];
            rows.forEach((row) => {
                response.push(row);
            });
            res.json(response);
        }
    });
});

// Get event by ID
router.get('/:id', (req, res) => {
    let sql = 'SELECT awayName, homeName, event_group, id, name, sport, country, state FROM events WHERE id  = ?';
    let id = req.params.id;
    db.get(sql, [id], (err, row) => {
    if (err) {
        return console.error(err.message);
    }
    if (row) {
        res.json(row);
        } else {
            res.status(400).json({msg:`Event with the id of ${req.params.id} doesn't exist`});
        }
    });
});

module.exports = router;
