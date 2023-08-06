import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import socket from '../socket/socket'

function HomeScreen() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    socket.on('initialData', (rows) => {
      setUsers(rows)
    })

    socket.on('userAdded', (newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser])
    })

    socket.on('userRemoved', (userId) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
    })

    return () => {
      socket.off('initialData')
      socket.off('userAdded')
      socket.off('userRemoved')
    }
  })

  return (
    <div className="container">
      <Header />
      <ul className="users">
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/profile/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
      <button className="button" onClick={() => navigate('/add-profile')}>
        Add User
      </button>
    </div>
  )
}

export default HomeScreen
