const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('mydatabase.db')

function initializeDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS listnames (
      id INTEGER PRIMARY KEY,
      name TEXT,
      accesslevel INTEGER,
      datecreate TEXT,
      icon TEXT
    )`)

    const insert = db.prepare(
      'INSERT INTO listnames (name, accesslevel, datecreate, icon) VALUES (?, ?, ?, ?)'
    )
    insert.run(
      'John Doe',
      1,
      '2023-08-03',
      'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'
    )
    insert.run(
      'Jane Smith',
      2,
      '2023-08-03',
      'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'
    )
    insert.run(
      'Alfie Robertson',
      2,
      '2023-08-03',
      'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'
    )
    insert.run(
      'Malachy Saunders',
      2,
      '2023-08-03',
      'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'
    )
    insert.run(
      'Lexie Riley',
      2,
      '2023-08-03',
      'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'
    )

    insert.finalize()
  })
}

module.exports = { initializeDatabase, db }
