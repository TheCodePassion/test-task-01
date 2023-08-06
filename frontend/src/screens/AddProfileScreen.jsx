import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import socket from '../socket/socket'

function AddProfileScreen() {
  const [name, setName] = useState('')
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleAddUser = () => {
    const userData = { name }

    socket.emit('addUser', userData)

    socket.on('userAdded', (data) => {
      if (data.message === 'User added successfully') {
        setNotification('User added successfully')
      } else {
        setNotification('Failed to add user')
      }
    })

    socket.on('error', (data) => {
      console.error('Error adding user:', data.message)
      setNotification('Failed to add user')
    })
  }

  return (
    <div className="container">
      <h2>Add User Profile</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="form-control"
          />
        </div>
        <button type="button" className="button" onClick={handleAddUser}>
          Add User
        </button>
      </form>
      {notification && (
        <div>
          <p>{notification}</p>
          <Link to="/" className="button">
            Return to Home
          </Link>
        </div>
      )}
    </div>
  )
}

export default AddProfileScreen
