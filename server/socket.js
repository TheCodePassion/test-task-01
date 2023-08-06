const socketIo = require('socket.io')

function configureSocket(server, db) {
  const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'DELETE'],
    },
  })

  io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('addUser', (data) => {
      const { name } = data
      const accesslevel = 2
      const datecreate = new Date().toISOString()
      const icon =
        'https://w1.pngwing.com/pngs/743/500/png-transparent-circle-silhouette-logo-user-user-profile-green-facial-expression-nose-cartoon.png'

      if (!name) {
        socket.emit('error', { message: 'Name is missing in request' })
        return
      }

      db.get('SELECT MAX(id) AS maxId FROM listnames', [], (err, result) => {
        if (err) {
          socket.emit('error', { message: err.message })
          return
        }

        const newId = (result.maxId || 0) + 1

        const insert = db.prepare(
          'INSERT INTO listnames (id, name, accesslevel, datecreate, icon) VALUES (?, ?, ?, ?, ?)'
        )
        insert.run(newId, name, accesslevel, datecreate, icon, function (err) {
          if (err) {
            socket.emit('error', { message: err.message })
            return
          }

          socket.emit('userAdded', { message: 'User added successfully' })
        })
      })
    })

    socket.on('deleteUser', (data) => {
      const userId = data.id

      db.run('DELETE FROM listnames WHERE id = ?', [userId], function (err) {
        if (err) {
          socket.emit('error', { message: err.message })
          return
        }

        socket.emit('userDeleted', { message: 'User deleted successfully' })
      })
    })

    socket.on('getUser', (data) => {
      const userId = data.id

      db.get('SELECT * FROM listnames WHERE id = ?', [userId], (err, row) => {
        if (err) {
          socket.emit('error', { message: err.message })
          return
        }

        if (!row) {
          socket.emit('error', { message: 'User not found' })
          return
        }

        socket.emit('userDetails', row)
      })
    })

    socket.on('updateUserName', (data) => {
      const userId = data.id
      const newName = data.name

      db.run(
        'UPDATE listnames SET name = ? WHERE id = ?',
        [newName, userId],
        (err) => {
          if (err) {
            socket.emit('error', { message: err.message })
            return
          }

          socket.emit('userNameUpdated', {
            message: 'User name updated successfully',
          })
        }
      )
    })

    db.all('SELECT * FROM listnames', (err, rows) => {
      if (err) {
        throw err
      }

      socket.emit('initialData', rows)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })

  return io
}

module.exports = { configureSocket }
