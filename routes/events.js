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
                event.homeName + "','" +
                event.group + "', " +
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

// Post event vote
router.post('/', (req, res) => {
  console.log(req.body)
    let values = [ req.body.user, parseInt(req.body.event)];
    console.log(values)
    let sql = 'SELECT id FROM polls WHERE user LIKE ? AND event = ?';
    db.get(sql, values, (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        // Check if any result is submitted
        if (!req.body.homeName & !req.body.awayName && !req.body.draw){
            res.status(400).json({msg: 'Please submit a game result'})
        }

        // Check if user already voted for the event. If not then save vote
        else if (row) {
            res.status(400).json({msg:`User with email ${req.body.user} already voted in this event`});
            } else {
                const values = [
                    req.body.event,
                    req.body.user,
                    req.body.homeName || 0,
                    req.body.awayName || 0,
                    req.body.draw || 0
                ]

                db.run('INSERT INTO polls(event, user, homeName, awayName, draw) VALUES(?, ?, ?, ?, ?)', values, function(err) {
                    if (err) {
                    return console.log(err.message);
                    }
                    res.status(200).json({msg: 'Poll received'});
                });
            }
        });

})

module.exports = router;
